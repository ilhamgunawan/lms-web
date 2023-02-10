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

export default function SettingsPage() {
  return (
    <Layout>
      <h1>Settings</h1>
    </Layout>
  );
}
