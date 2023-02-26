import Head from "next/head";
import React from "react";
import ProductGrid from "../../src/components/product/ProductGrid";
import { DOMAIN } from "../../src/utils/const";

export async function getServerSideProps() {
  let URL = `${DOMAIN}/api/v1/products`;
  try {
    let data = await (await fetch(URL)).json();
    return {
      props: { data, error: null },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        error: error.message,
      },
    };
  }
}

const index = ({ data, error = "An error" }) => {
  return (
    <>
      <Head>
        <title>Products-DOT Shop</title>
      </Head>
      <section className="py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center justify-center text-center my-8">
          <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l from-indigo-300" />
          <h1 className="text-3xl font-bold font-cinzel">Featured</h1>
          <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l to-purple-400 from-indigo-400 rounded-full" />
          <h1 className="text-3xl font-bold font-cinzel">Products</h1>
          <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-r from-indigo-300" />
        </div>
        <ProductGrid products={data} error={error} />
      </section>
    </>
  );
};

export default index;
