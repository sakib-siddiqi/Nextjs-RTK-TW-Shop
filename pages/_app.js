import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import Layout from "./layout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
