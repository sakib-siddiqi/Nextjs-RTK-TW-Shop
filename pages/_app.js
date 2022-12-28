import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
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

Router.onRouteChangeStart = (url) => {
  nProgress.start();
};

Router.onRouteChangeComplete = () => nProgress.done();

Router.onRouteChangeError = () => nProgress.done();

export default function App({ Component, pageProps }) {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const start = (event) => {
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log("findished");
  //     setLoading(false);
  //   };
  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);

  // if(loading) return <h1 className="text-4xl text-center py-10  text-slate-600">Loading...</h1>

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistStore(store)}>
        <Layout>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
