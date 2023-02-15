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

  const { isLoading: isLoadingPostLogin, mutate, error } = Login({
    onSuccess: (res) => {
      if (res.data) {
        window.localStorage.setItem('user', JSON.stringify(res.data.data));
        window.localStorage.setItem('token', res.data.data.token);
        window.location.replace(appRoutes.dashboard.path);
      }
    },
  });

  const errorMessage = error instanceof AxiosError
    ? (error.response?.data.message as string | undefined)
    : undefined;

  const isLoading = isLoadingPostLogin || disabled;

  return (
    <Paper shadow="md" p="md" w="350px" maw="100%">
      <form onSubmit={form.onSubmit((values) => mutate(values))}>
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
