import { AxiosError } from 'axios';
import {
  Alert,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  TextInput,
  Paper,
  PasswordInput,
  Stack,
} from '@mantine/core';
import {
  isNotEmpty,
  useForm, 
} from '@mantine/form';
import {
  IconAlertCircle,
  IconAt,
  IconLock,
} from '@tabler/icons';
import appRoutes from '../../routes';
import { Login } from '../../services/react-query/auth';

import { useMachine } from '@xstate/react';
import { loginMachine } from './loginMachine';

type Props = {
  disabled: boolean
};

export default function LoginForm({ disabled }: Props) {
  const form = useForm({
    initialValues: {
      user_name: '',
      password: '',
    },
    validate: {
      user_name: isNotEmpty('Enter your username'),
      password: isNotEmpty('Enter your password'),
    },
  });

  const [current, send] = useMachine(loginMachine);

  const { mutate: login, error } = Login({
    onSuccess: (res) => {
      if (res.data) {
        window.localStorage.setItem('user', JSON.stringify(res.data.data));
        window.localStorage.setItem('token', res.data.data.token);
        window.location.replace(appRoutes.dashboard.path);
        send('FETCH_SUCCESS');
      } else {
        send('FETCH_ERROR');
      }
    },
    onError: () => {
      send('FETCH_ERROR');
    },
  });

  const errorMessage = error instanceof AxiosError
    ? (error.response?.data?.message as string | undefined)
    : 'Something went wrong, please try again';

  const isLoading = current.matches('fetchingLoginPending') || disabled;

  return (
    <Paper shadow="md" p="md" w="350px" maw="100%">
      <form 
        onSubmit={form.onSubmit((values) => {
          send('FETCH_START');
          login(values);
        })}
      >
        <Flex
          direction="column"
          gap="xs"
        >
          {current.matches('fetchingLoginFailed')
            ? <Alert icon={<IconAlertCircle size="16px" />} title="Log in failed!" color="red">
                {errorMessage}
              </Alert>
            : null
          }
          <Stack style={{ position: "relative" }}>
            <LoadingOverlay visible={isLoading} overlayBlur={1} />
            <TextInput
              placeholder="Your username"
              icon={<IconAt size="16px" />}
              {...form.getInputProps('user_name')}
            />
            <PasswordInput
              placeholder="Your password"
              icon={<IconLock size="16px" />}
              {...form.getInputProps('password')}
            />
          </Stack>
          <Group position="right">
            <Button type="submit" disabled={isLoading}>Log in</Button>
          </Group>
        </Flex>
      </form>
    </Paper>
  );
}
