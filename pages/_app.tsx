import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../auth';
import Layout from '../components/common/Layout';
import { GlobalContextProvider } from '../context/GlobalContextProvider';
import '../styles/globals.css';
// import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const contentLong =
    'WorkStats is a dashboard tool for engineers and project managers engaged in system development to visualize their productivity and contributions in numbers. It aggregates various numbers from the platforms used by members and teams, such as GitHub for source control, Asana for task management, and Slack for communication tools.WorkStats';
  const contentShort =
    'is a dashboard tool for engineers and PMs to quantify their productivity, aggregating various numbers from GitHub, Asana, Slack, etc.';

  return (
    <>
      <Head>
        <meta name='description' content={contentLong} />
        <meta property='og:title' content='WorkStats' />
        <meta property='og:description' content={contentShort} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://workstats.dev' />
        <meta
          property='og:image'
          content='https://drive.google.com/file/d/1oP-avBzGd6YCISYUia0XvklWuV3mOg3a/view?usp=sharing'
        />
        <meta property='og:image:alt' content='WorkStats' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:site_name' content='WorkStats' />
        <meta property='og:locale' content='en_US' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='WorkStats' />
        <meta name='twitter:site' content='@workstatsdev' />
        <meta name='twitter:creator' content='@workstatsdev' />
        <meta
          name='twitter:image'
          content='https://drive.google.com/file/d/1oP-avBzGd6YCISYUia0XvklWuV3mOg3a/view?usp=sharing'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icononly_transparent_nobuffer.ico' />
      </Head>
      <AuthProvider>
        <GlobalContextProvider>
          <Layout>
            {/* <Script
          src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
          strategy="beforeInteractive"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.3.3/dist/flowbite.min.css"
        /> */}
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
