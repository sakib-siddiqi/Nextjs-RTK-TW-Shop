import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import Layout from "./layout";

function Loading() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div>
        <img
          src="//dot-shop.vercel.app/dot-logo.svg"
          alt=""
          className="max-w-[250px] w-full"
        />
        <h2 className="text-center font-semibold text-xl font-mono text-slate-600">
          Loading...
        </h2>
      </div>
    </main>
  );
}
Router.onRouteChangeStart = (url) => nProgress.start();
Router.onRouteChangeComplete = () => nProgress.done();
Router.onRouteChangeError = () => nProgress.done();

// ---------------
const queryClient = new QueryClient();
export default function App({ Component, pageProps: { ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const UI = getLayout(<Component {...pageProps} />);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />
        </Head>
        {UI}
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}
