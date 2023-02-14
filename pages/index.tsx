import type { GetServerSideProps } from 'next';
import type { Config } from '../common/utils';
import NextHead from 'next/head';
import { getConfig } from '../common/utils';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import appRoutes from '../routes';
import { ValidateToken } from '../services/react-query/auth';
import {
  Container,
  Flex,
  Loader,
} from '@mantine/core';

interface PageProps {
  config: Config;
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const config = getConfig();
  return {
    props: {
      config,
    },
  };
};

export default function Index(props: PageProps) {
  const router = useRouter();

  const { mutate: validate } = ValidateToken({
    onError: () => router.replace(appRoutes.login.path),
    onSuccess: () => router.replace(appRoutes.dashboard.path),
  });

  useEffect(() => {
    validate({ token: window.localStorage.getItem('token') ?? '' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container mih="100vh">
      <NextHead>
        <title>{props.config.siteName}</title>
      </NextHead>
      <Flex
        justify="center"
        align="center"
        h="100vh"
      >
        <Loader />
      </Flex>
    </Container>
  );
};
