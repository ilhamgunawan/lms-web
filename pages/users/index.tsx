import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { getConfig } from "../../common/utils";
import Layout from "../../src/layout/LayoutV3";
import appRoutes from "../../routes";
import UsersTable from "../../src/users/UsersTable";
import { GetUsers } from "../../services/react-query/users";
import { Loader } from "@mantine/core";

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
