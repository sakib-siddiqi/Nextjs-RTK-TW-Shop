import axios from "axios";
import Image from "next/image";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { BASE_API_ROUTE } from "../../const";
import { add_to_cart } from "../../redux/slices/cart.slice";

export async function getStaticPaths() {
  const URL = `${BASE_API_ROUTE}/api/v1/products`;
  try {
    const { data } = await axios.get(URL);
    return {
      paths: data.map((ele) => ({ params: { id: ele._id } })),
      fallback: "blocking", // can also be true or 'blocking'
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps(context) {
  const id = context.params.id;
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

const SingleProduct = ({ data = {} }) => {
  const dispatch = useDispatch();
  function on_add_to_cart() {
    dispatch(add_to_cart(data));
  }

  return (
    <section className="pt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <Image
              src={data?.image}
              alt=""
              className="max-h-96 object-contain object-center border-2 border-indigo-200 rounded-md"
              height={500}
              width={500}
            />
          </div>
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold text-slate-800 tracking-wider">
              {data?.title}
            </h1>
            <h1 className="text-6xl font-semibold text-slate-800 tracking-wider">
              {data?.price}
            </h1>
            <button
              className="h-12 w-12 rounded-full bg-indigo-500 inline-grid place-items-center text-white active:bg-indigo-900 hover:bg-indigo-700 my-4"
              onClick={on_add_to_cart}
            >
              <AiOutlineShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
