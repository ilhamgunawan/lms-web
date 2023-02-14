import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import appRoutes from '../../routes';
import { CreateUser } from '../../services/react-query/users';

import {
  isNotEmpty,
  useForm, 
} from '@mantine/form';
import {
  Alert,
  Button,
  Flex,
  Group,
  PasswordInput,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconAlertCircle,
  IconAt,
  IconCalendar,
  IconLock,
} from '@tabler/icons';

type Props = {
  closeModal: () => void
}

export default function CreateUserForm({ closeModal }: Props) {
  const form = useForm({
    initialValues: {
      user_name: '',
      password: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: 'm',
    },
    validate: {
      user_name: isNotEmpty('Username cannot be empty'),
      password: isNotEmpty('Enter default password for this user'),
      first_name: isNotEmpty('First name cannot be empty'),
      last_name: isNotEmpty('Last name cannot be empty'),
      date_of_birth: isNotEmpty('Birthdate cannot be empty'),
    },
  });

  const router = useRouter();

  const { isLoading, mutate: createUser, error } = CreateUser({
    onSuccess: () => {
      closeModal();
      router.push(appRoutes.users.path);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          router.replace(appRoutes.login.path);
        }
      }
    },
  });

  const errorMessage = error instanceof AxiosError
    ? (error.response?.data.message as string | undefined)
    : undefined;

  return (
    <form onSubmit={form.onSubmit((values) => createUser(values))}>
      <Flex
        direction="column"
        gap="xs"
      >
        {errorMessage 
          ? <Alert icon={<IconAlertCircle size="16px" />} title="Log in failed!" color="red">
              {errorMessage}
            </Alert>
          : null
        }
        <Flex direction="row" gap="sm">
          <TextInput
            style={{ flex: '1' }}
            label="First Name"
            withAsterisk
            placeholder="First name"
            disabled={isLoading}
            {...form.getInputProps('first_name')}
          />
          <TextInput
            style={{ flex: '1' }}
            label="Last Name"
            withAsterisk
            placeholder="Last Name"
            disabled={isLoading}
            {...form.getInputProps('last_name')}
          />
        </Flex>
        <Text size="sm" weight="500" color="dark">Gender</Text>
        <SegmentedControl
          data={[
            { label: 'Male', value: 'm' },
            { label: 'Female', value: 'f' },
          ]}
          disabled={isLoading}
          {...form.getInputProps('gender')}
        />
        <DatePicker
          withAsterisk
          label="Birthdate" 
          placeholder="Pick date"
          icon={<IconCalendar size="16px" />}
          disabled={isLoading}
          {...form.getInputProps('date_of_birth')}
        />
        <TextInput
          label="Username"
          withAsterisk
          placeholder="Enter username"
          icon={<IconAt size="16px" />}
          disabled={isLoading}
          {...form.getInputProps('user_name')}
        />
        <PasswordInput
          label="Default password"
          withAsterisk
          placeholder="Enter default password"
          icon={<IconLock size="16px" />}
          disabled={isLoading}
          {...form.getInputProps('password')}
        />
        <Group position="right">
          <Button type="submit" loading={isLoading}>Create User</Button>
        </Group>
      </Flex>
    </form>
  );
}
