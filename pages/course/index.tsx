import type { GetServerSideProps } from 'next';
import type { Config } from '../../common/utils';
import NextHead from 'next/head';
import { getConfig } from '../../common/utils';
import Layout from '../../src/layout/LayoutV2';
import RouteProtection from '../../src/route-protection/RouteProtection';

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
  return (
    <>
    <NextHead>
      <title>{`Courses - ${props.config.siteName}`}</title>
    </NextHead>
    <Layout breadcumbList={[
          {
            name: 'Courses',
            href: null,
          }
        ]}>
      <RouteProtection allowedRoles={['admin']}>
        <h1>{'Courses'}</h1>
      </RouteProtection>
    </Layout>
  </>
  );
};

export default Users;
