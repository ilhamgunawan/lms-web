import { GetServerSideProps } from "next/types";
import { getConfig } from "../../common/utils";
import Layout from "../../src/layout/LayoutV3";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const config = getConfig();
  return {
    props: {
      config,
    },
  };
};

export default function UsersManagementPage() {
  return (
    <Layout>
      <h1>Users Management</h1>
    </Layout>
  );
}
