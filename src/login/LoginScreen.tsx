import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Flex,
} from '@mantine/core';
import LoginForm from './LoginForm';
import appRoutes from '../../routes';
import { ValidateToken } from '../../services/react-query/auth';

export default function LoginLayout() {
  const router = useRouter();

  const { isLoading, mutate: validate } = ValidateToken({
    onSuccess: () => router.replace(appRoutes.dashboard.path),
  });

  useEffect(() => {
    validate({token: window.localStorage.getItem('token') ?? ''});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container mih="100vh">
      <Flex
        justify="center"
        align="center"
        h="100vh"
      >
        <LoginForm disabled={isLoading} />
      </Flex>
    </Container>
  );
}
