import axios from "axios";
import React from "react";
import ProductGrid from "../../components/product/ProductGrid";
import { BASE_API_ROUTE } from "../../const";

export async function getStaticProps() {
  let URL = `${BASE_API_ROUTE}/api/v1/products`;
  let props = { data: [], error: "", url: URL };
  try {
    let data = await (await fetch(URL)).json();
    props.data = data;
    props.error = null;
  } catch (error) {
    props.data = [];
    props.error = error.message;
  }
  return {
    props: props, // will be passed to the page component as props
  };
}

const index = ({ data = [], error }) => {
  return (
    <section className="py-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center justify-center text-center  my-8">
        <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l from-indigo-300" />
        <h1 className="text-3xl font-bold font-cinzel">Featured</h1>
        <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-l to-purple-400 from-indigo-400 rounded-full" />
        <h1 className="text-3xl font-bold font-cinzel">Products</h1>
        <hr className="hidden md:inline-block border-0 h-1 bg-gradient-to-r from-indigo-300" />
      </div>
      <ProductGrid products={data} error={error} />
    </section>
  );
};

export default index;
