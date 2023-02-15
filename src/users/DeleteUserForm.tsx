import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import appRoutes from '../../routes';
import { DeleteUser } from '../../services/react-query/users';
import { DeleteUserRequest } from '../../models/api/users';

import {
  isNotEmpty,
  useForm, 
} from '@mantine/form';
import {
  Alert,
  Button,
  Flex,
  Group,
  Text,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconTrash,
} from '@tabler/icons';

type Props = {
  closeModal: () => void
  user: DeleteUserRequest
}

export default function DeleteUserForm({ closeModal, user }: Props) {
  const form = useForm({
    initialValues: {
      id: user.id,
    },
    validate: {
      id: isNotEmpty('User id cannot be empty'),
    },
  });

  const router = useRouter();

  const { isLoading, mutate: deleteUser, error } = DeleteUser({
    onSuccess: () => {
      router.push(appRoutes.users.path);
      closeModal();
      showNotification({
        title: 'Success',
        message: 'User has been deleted!',
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
      onSubmit={form.onSubmit((_values) => deleteUser(user))}
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
        <Text color="dark" mb="md">
          Do you want to delete this user?
        </Text>
        <Group position="right">
          <Button 
            type="button" 
            loading={isLoading}
            color="gray"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            loading={isLoading}
            color="red"
            leftIcon={<IconTrash size="16px" />}
          >
            Delete
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
