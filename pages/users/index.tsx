import React from 'react';
import { GetServerSideProps } from 'next';
import NextHead from 'next/head';
import { getConfig, Config } from '../../common/utils';
import Layout from '../../src/layout/Layout';
import RouteProtection from '../../src/route-protection/RouteProtection';
import AuthProtection from '../../src/auth-protection/AuthProtection';
import { fetchUsers } from '../../api/users';

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

const Users = (props: PageProps) => {
  React.useEffect(() => {
    fetchUsers()
      .then(data => console.log(data));
  }, []);

  return (
    <AuthProtection>
      <NextHead>
        <title>{`Users - ${props.config.siteName}`}</title>
      </NextHead>
      <Layout config={props.config}>
        <RouteProtection allowedRoles={['admin', 'teacher']}>
          <h1>{'Users'}</h1>
        </RouteProtection>
      </Layout>
    </AuthProtection>
  );
};

export default Users;
