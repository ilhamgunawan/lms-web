import { GetServerSideProps } from "next/types";
import { Text } from "@mantine/core";
import { getConfig } from "../../common/utils";
import Layout from "../../src/layout/LayoutV3";
import appRoutes from "../../routes";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const config = getConfig();
  return {
    props: {
      config,
    },
  };
};

export default function CoursesPage() {
  return (
    <Layout>
      <Text color="dark" fz="xl" fw="bold">{appRoutes.course.name}</Text>
    </Layout>
  );
}
