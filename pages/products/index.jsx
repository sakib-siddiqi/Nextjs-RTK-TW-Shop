import React from "react";
import ProductGrid from "../../components/product/ProductGrid";
import { BASE_API_ROUTE } from "../../const";

export async function getServerSideProps() {
  let URL = `${BASE_API_ROUTE}/api/v1/products`;
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
  console.log({ data, error });
  return (
    <section className="py-16 bg-white">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center">
        <hr className="border-0 h-1 bg-gradient-to-l from-pink-300" />
        <h1 className="text-3xl font-bold font-cinzel">Featured</h1>
        <hr className="border-0 h-1 bg-gradient-to-l to-purple-400 from-pink-400 rounded-full" />
        <h1 className="text-3xl font-bold font-cinzel">Products</h1>
        <hr className="border-0 h-1 bg-gradient-to-r from-pink-300" />
      </div>
      <ProductGrid products={data} error={error} />
    </section>
  );
};

export default index;
