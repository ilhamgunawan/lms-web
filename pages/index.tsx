import type { GetServerSideProps } from 'next';
import type { Config } from '../common/utils';
import NextHead from 'next/head';
import { getConfig } from '../common/utils';
import Layout from '../src/layout/LayoutV2';
import RouteProtection from '../src/route-protection/RouteProtection';
import AuthProtection from '../src/auth-protection/AuthProtection';
import Dashboard from '../src/dashboard/Dashboard';

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

export default function Home(props: PageProps) {
  return (
    <AuthProtection>
      <NextHead>
        <title>{`Home - ${props.config.siteName}`}</title>
      </NextHead>
      <Layout>
        <RouteProtection allowedRoles={['admin', 'teacher', 'student']}>
          <Dashboard />
        </RouteProtection>
      </Layout>
    </AuthProtection>
  );
};
