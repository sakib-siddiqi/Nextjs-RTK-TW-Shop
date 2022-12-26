import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BASE_API_ROUTE } from "../const";

export async function getServerSideProps(context) {
  const id = context?.params?.id;
  if (!id) {
    throw new Error(`ID is invalid ${id}`);
  }
  const URL = `${BASE_API_ROUTE}/api/v1/products/${id}`;
  try {
    const { data } = await axios.get(URL);
    return { props: { data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const SingleProduct = ({ data }) => {
  const {
    query: { id },
  } = useRouter();

  return (
    <section className="pt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <Image src={data?.image} alt="" className="max-h-96 object-contain object-center border-2 border-rose-200 rounded-md" height={500} width={500} />
          </div>
          <div className="col-span-2">
            <h1 className="text-lg font-semibold text-slate-800 tracking-wider">
              {data?.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
