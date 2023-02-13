import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { getConfig } from "../../common/utils";
import Layout from "../../src/layout/LayoutV3";
import appRoutes from "../../routes";
import { getAllUsers } from "../../api/users";
import UsersTable from "../../src/users/UsersTable";
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

  const { isLoading, data } = useQuery(`getAllUsers_${page}`, () => getAllUsers(page), {
    onError: (err) => {
      // console.log('error', err);

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
            getAllUsersData={data?.data} 
          />
        : null
      }
    </Layout>
  );
}
