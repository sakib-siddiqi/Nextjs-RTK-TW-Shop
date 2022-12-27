import Head from "next/head";
import Banner from "../components/Home/Banner";
import ProductGrid from "../components/product/ProductGrid";
import { BASE_API_ROUTE } from "../const";

export async function getServerSideProps() {
  let URL = `${BASE_API_ROUTE}/api/v1/products`;
  console.log(URL);
  let props = { data: [], error: "", url: URL };
  try {
    let data = await (await fetch(URL)).json();
    props.data = data;
    props.error = null;
  } catch (error) {
    props.data = [];
    console.error(error);
    props.error = error.message;
  }
  return {
    props: props, // will be passed to the page component as props
  };
}

export default function Home({ data = [], error = "" }) {
  if (error)
    return (
      <h1 className="text-4xl font-bold font-mono text-indigo-800">{error}</h1>
    );
  return (
    <>
      <Head>
        <title>Dot Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Banner />
        {/* PRODUCT GIRDS */}
        <section className="py-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center justify-center text-center">
            <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l from-indigo-300" />
            <h1 className="text-3xl font-bold font-cinzel">Featured</h1>
            <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l to-purple-400 from-indigo-400 rounded-full" />
            <h1 className="text-3xl font-bold font-cinzel">Products</h1>
            <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-r from-indigo-300" />
          </div>
          <ProductGrid className="py-5" products={data} error={error} />
        </section>
      </>
    </>
  );
}
