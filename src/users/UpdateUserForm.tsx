import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import appRoutes from '../../routes';
import { UpdateUser } from '../../services/react-query/users';
import { UpdateUserRequest } from '../../models/api/users';

import {
  isNotEmpty,
  useForm, 
} from '@mantine/form';
import {
  Alert,
  Button,
  Flex,
  Group,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconAlertCircle,
  IconCalendar,
  IconDeviceFloppy,
} from '@tabler/icons';

type Props = {
  closeModal: () => void
  user: UpdateUserRequest
}

export default function UpdateUserForm({ closeModal, user }: Props) {
  const form = useForm({
    initialValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      date_of_birth: new Date(user.date_of_birth),
      gender: user.gender,
    },
    validate: {
      first_name: isNotEmpty('First name cannot be empty'),
      last_name: isNotEmpty('Last name cannot be empty'),
      date_of_birth: isNotEmpty('Birthdate cannot be empty'),
    },
  });

  const router = useRouter();

  const { isLoading, mutate: updateUser, error } = UpdateUser({
    onSuccess: () => {
      router.push(appRoutes.users.path);
      closeModal();
      showNotification({
        title: 'Success',
        message: 'User has been updated!',
      });
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
    <form 
      onSubmit={form.onSubmit((values) => updateUser({
        ...values, 
        date_of_birth: values.date_of_birth.toISOString()
      }))}
    >
      <Flex
        direction="column"
        gap="xs"
      >
        {errorMessage 
          ? <Alert icon={<IconAlertCircle size="16px" />} title="Something went wrong" color="red">
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
        <Group position="right">
          <Button 
            type="submit" 
            loading={isLoading}
            leftIcon={<IconDeviceFloppy size="16px" />}
          >
            Save
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
