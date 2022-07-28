import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Text,
  Spacer,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

import { createMachine, assign, send } from 'xstate';
import { useMachine } from '@xstate/react';

type CreateUserContext = {
  request: {
    name: string,
    email: string,
    role: string,
  },
  response: {
    data: any,
    message: string,
    status: string,
  },
  validation: Array<string>,
  router: NextRouter,
}

function makeMachine(router: NextRouter) {
  return (
    createMachine({
      id: 'createUserForm',
      initial: 'idle',
      schema: {
        context: {} as CreateUserContext
      },
      context: {
        request: {
          name: "",
          email: "",
          role: "",
        },
        response: {
          data: "",
          message: "",
          status: "",
        },
        validation: [],
        router,
      },
      states: {
        idle: {
          on: {
            INPUT: { target: "idle", actions: "inputForm" },
            VALIDATE: { target: "validating", actions: "updateValidation" },
          },
        },
        validating: {
          invoke: {
            src: 'calculateValidation',
          },
          on: {
            VALID: { target: "submitting" },
            INVALID: { target: "idle" },
          },
        },
        submitting: {
          invoke: {
            src: "postData",
          },
          on: {
            OK: { target: "succeed" },
            ERROR: { target: "idle", actions: "updateError" },
          },
        },
        succeed: {
          invoke: {
            src: "redirectToSource",
          },
          type: "final"
        },
      }
    },
    {
      actions: {
        inputForm: assign({
          request: (context, event) => {
            return ({
              ...context.request,
              ...event,
            });
          },
        }),
        updateValidation: assign({
          validation: (context, event) => {
            let validation: Array<string> = [];
            const { name, email, role } = context.request;
            if (name === "") {
              validation = [...validation, "EMPTYNAME"];
            }
            if (email === "") {
              validation = [...validation, "EMPTYEMAIL"];
            }
            if (role === "") {
              validation = [...validation, "EMPTYROLE"];
            }
            return [...validation];
          },
        }),
        updateError: assign({
          response: (context, event) => {
            return ({
              data: "",
              message: "Error",
              status: "Error",
            });
          },
        }),
      },
      services: {
        calculateValidation: (context, event, {src}) => 
          (send) => {
            if (context.validation.length === 0) send("VALID");
            send("INVALID");
          },
        postData: (context, event, {src}) => 
          async (send) => {
            setTimeout(() => send("OK"), 2000)
          },
        redirectToSource: (context, event, {src}) =>
          (send) => {
            context.router.replace('/user');
          },
      },
    })
  )
};

export default function UserForm(): JSX.Element {
  const router = useRouter();
  const toast = useToast()
  const [state, send] = useMachine(makeMachine(router));
  const { name, email, role } = state.context.request;
  const isFormDisabled = state.value === 'validating' || state.value === 'submitting' || state.value === 'succeed';
  const isNameInvalid = Boolean(state.context.validation.find(err => err === 'EMPTYNAME'));
  const isEmailInvalid = Boolean(state.context.validation.find(err => err === 'EMPTYEMAIL'));
  const isRoleInvalid = Boolean(state.context.validation.find(err => err === 'EMPTYROLE'));
  const isShowErrorToast = state.context.response.status === 'Error';

  React.useEffect(() => {
    if (state.value === 'succeed') {
      router.replace('/user');
    }
  }, [state.value]);

  return (
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      marginTop='4'
      p={6}
    >
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Create User
      </Heading>
      <FormControl id="form-user-name" isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder="Full name"
          _placeholder={{ color: 'gray.500' }}
          type="text"
          isDisabled={isFormDisabled}
          value={name}
          onChange={(event) => {
            send("INPUT", { name: event.target.value })
          }}
        />
        {isNameInvalid && 
          <Text color='red' fontSize='small'>Name cannot be empty</Text>
        }
      </FormControl>
      <FormControl id="form-user-email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="your-email@example.com"
          _placeholder={{ color: 'gray.500' }}
          type="email"
          isDisabled={isFormDisabled}
          value={email}
          onChange={(event) => {
            send("INPUT", { email: event.target.value })
          }}
        />
        {isEmailInvalid && 
          <Text color='red' fontSize='small'>Email cannot be empty</Text>
        }
      </FormControl>
      <FormControl id="form-user-role" isRequired>
        <FormLabel>Default role</FormLabel>
        <Select 
          placeholder='Select role'
          isDisabled={isFormDisabled}
          value={role}
          onChange={(event) => {
            send("INPUT", { role: event.target.value })
          }}
        >
          <option value='admin'>Admin</option>
          <option value='teacher'>Teacher</option>
          <option value='student'>Student</option>
        </Select>
        {isRoleInvalid && 
          <Text color='red' fontSize='small'>Role cannot be empty</Text>
        }
      </FormControl>
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isFormDisabled}
          onClick={() => send("VALIDATE")}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
