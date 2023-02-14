import { AxiosError } from "axios";
import { GetServerSideProps } from "next/types";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

import appRoutes from "../../routes";
import { getConfig } from "../../common/utils";
import { GetUsers } from "../../services/react-query/users";

import CreateUser from "../../src/users/CreateUser";
import Layout from "../../src/layout/LayoutV3";
import UsersTable from "../../src/users/UsersTable";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const config = getConfig();
  return {
    props: {
      config,
    },
  };
};

export default function UsersManagementPage() {
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : 1;

  const { isLoading, data } = GetUsers({
    req: { page },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          router.replace(appRoutes.login.path);
        }
      }
    },
  });

  return (
    <Layout>
      <h1>Users Management</h1>
      <CreateUser />
      {isLoading ? <Loader /> : null}
      {data?.data.data
        ? <UsersTable
            page={page}
            data={data?.data} 
          />
        : null
      }
    </Layout>
  );
}
