import type { GetServerSideProps } from 'next';
import type { Config } from '../../../common/utils';
import NextHead from 'next/head';
import { getConfig } from '../../../common/utils';
import LoginScreen from '../../../src/login/LoginScreen';

interface PageProps {
  config: Config;
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const config = getConfig();
  return {
    props: {
      config,
    },
  };
};

const Login = (props: PageProps) => {
  return (
    <>
      <NextHead>
        <title>{`Login - ${props.config.siteName}`}</title>
      </NextHead>
      <LoginScreen />
    </>
  );
};

export default Login;
