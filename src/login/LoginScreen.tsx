import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Flex,
} from '@mantine/core';
import LoginForm from './LoginForm';
import useValidateToken from '../../hooks/useValidateToken';
import appRoutes from '../../routes';

export default function LoginLayout() {
  const router = useRouter();

  const { isLoading, validate } = useValidateToken({
    onSuccess: (res) => {
      router.replace(appRoutes.dashboard.path);
    },
  });

  useEffect(() => {
    validate();

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
