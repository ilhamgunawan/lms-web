import type { GetServerSideProps } from 'next';
import type { Config } from '../common/utils';
import NextHead from 'next/head';
import { getConfig } from '../common/utils';
import Layout from '../src/layout/Layout';
import RouteProtection from '../src/route-protection/RouteProtection';
import AuthProtection from '../src/auth-protection/AuthProtection';

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

const Dashboard = (props: PageProps) => {
  return (
    <AuthProtection>
      <NextHead>
        <title>{`Dashboard - ${props.config.siteName}`}</title>
      </NextHead>
      <Layout config={props.config}>
        <RouteProtection allowedRoles={['admin', 'teacher', 'student']}>
          <h1>{'Dashboard'}</h1>
        </RouteProtection>
      </Layout>
    </AuthProtection>
  );
};

export default Dashboard;
