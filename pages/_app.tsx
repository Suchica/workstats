import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth';
import Layout from '../components/common/Layout';
import '../styles/globals.css';
// import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default MyApp;
