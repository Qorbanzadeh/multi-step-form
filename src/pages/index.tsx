// library imports
import Head from "next/head";

// component imports
import Layout from "@/components/layout.component";
import Form from "@/components/form.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Multi Step Form</title>
        <meta name="description" content="Frontend Mentor Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Form />
      </Layout>
    </>
  );
}
