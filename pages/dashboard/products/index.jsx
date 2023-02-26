import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import API from "../../../src/services/API";
import withLayout, { LAYOUT_TYPES } from "../../layout.manager";

export default function index() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => API.products.get(),
  });
  console.log(data);

  async function deleteProduct(id) {
    const confirm = window.confirm("Are you sure?");
    const result = confirm ? await API.products.delete(id) : null;
    window.alert(JSON.stringify(result, true, 2));
  }

  let UI = null;
  if (isFetching) {
    UI = <h1>LOADING...</h1>;
  }
  if (error) {
    UI = <h1>{error}</h1>;
  }
  UI = (
    <div className="overflow-x-auto mb-2">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Rating</th>
            <th>keywords</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, index) => (
            <tr className="text-sm">
              <td className="px-2 py-1">{index + 1}</td>
              <td className="px-2 py-1 max-w-sm min-w-[300px] whitespace-normal">
                <img
                  src={product?.images?.[0]}
                  alt=""
                  className="h-10 w-10 rounded-sm inline-block"
                />{" "}
                {product?.title}
              </td>
              <td className="px-2 py-1">{product?.category}</td>
              <td className="px-2 py-1">{product?.stock}</td>
              <td className="px-2 py-1">
                <span className={product.discount ? "line-through" : ""}>
                  {product?.price}
                </span>{" "}
                <br />
                <span className="text-xs">
                  -{product?.discount}%=
                  {(+product?.price * (+product?.discount / 100)).toFixed(2)}
                </span>
              </td>
              <td className="px-2 py-1">
                {product?.rating?.value}/{product?.rating?.count}
              </td>
              <td className="px-2 py-1 max-w-xs min-w-[250px] whitespace-normal">
                {product?.keywords}
              </td>
              <td className="px-2 py-1">
                <Link
                  href={"/dashboard/products/" + product._id}
                  className="inline-flex justify-center items-center p-2 text-xl mx-1 rounded-md bg-indigo-500 hover:bg-indigo-700 text-white"
                >
                  <CiEdit className="inline" />
                </Link>
                <button
                  className="p-2 text-xl mx-1 rounded-md bg-rose-500 hover:bg-rose-700 text-white"
                  onClick={() => deleteProduct(product._id)}
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Head>
        <title>Products-Dashboard</title>
      </Head>
      <section>
        {/* OVER VIEW  */}
        <div className="flex justify-between items-center gap-2  my-4">
          <h1 className="text-2xl font-semibold tracking-wider">Products</h1>
          <Link
            href={"/dashboard/products/add"}
            className="px-3 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-800 text-white font-semibold tracking-wide inline-flex justify-center items-center"
          >
            <span className="mr-2 ">Add </span>
            <BiAddToQueue className="inline-block" />
          </Link>
        </div>
      </section>
      <section>{UI}</section>
    </>
  );
}

index.getLayout = withLayout(LAYOUT_TYPES.DASHBOARD);
