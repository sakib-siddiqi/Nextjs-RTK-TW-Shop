import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import CART_SLICE from "../redux/slices/cart.slice";

const PORTFOLIO = "https://sakib-siddiqi.netlify.app/";

function CartCart({ product }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${window.location.origin}/api/v1/products/${product?.product_id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.info(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [product?.product_id]);
  if (loading) return <p className="text-slate-300 font-mono">Loading...</p>;
  return (
    <div className="grid grid-cols-12 gap-2 mb-3 border-2 border-slate-100  bg-slate-50 overflow-hidden">
      <figure className="col-span-3">
        <Image
          src={data?.image || "/dot-error.svg"}
          height={200}
          width={200}
          className="h-full w-full max-h-28 object-contain object-center"
          alt={data?.title}
        />
      </figure>
      <div className="col-span-7 relative">
        <span className="inline-grid place-items-center absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[120%] h-8 w-8 rounded-full ring-1 ring-offset-2 bg-indigo-500 text-indigo-50 ">
          {product?.count}
        </span>
        <h2 className="text-md">{data?.title}</h2>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}

function CartModal() {
  const cart = useSelector((store) => store?.[CART_SLICE.name]?.cart);

  return (
    <>
      {/* CART */}
      <input type="checkbox" id="cart-modal" className="modal-toggle" />
      <label
        htmlFor="cart-modal"
        className="modal cursor-pointer bg-slate-900/30 backdrop-blur-md backdrop-saturate-150 bg-blend-saturation flex-col overflow-auto"
      >
        <label
          className="modal-box relative rounded-md  min-h-[18rem] p-0 overflow-auto"
          htmlFor=""
        >
          <div className="p-3 bg-slate-700 sticky top-0 w-full flex gap-2 ">
            <AiOutlineShoppingCart className="text-indigo-50 h-8 w-8" />

            <div className="grow">
              <h3 className="text-lg font-medium text-white tracking-wider">
                Cart.
              </h3>
              <p className="text-slate-100 text-md">
                Your cart products. Happy shopping 🥰
              </p>
            </div>
          </div>
          <div className="p-3">
            {cart?.length ? (
              cart?.map((ele) => <CartCart product={ele} />)
            ) : (
              <p className="text-md text-slate-8000">
                Cart is empty. Go to{" "}
                <label
                  htmlFor="cart-modal"
                  className="text-indigo-500 underline underline-offset-2 font-semibold font-mono"
                >
                  <Link href="/">shop</Link>
                </label>
              </p>
            )}
          </div>
        </label>
      </label>
    </>
  );
}

export default function layout({ children }) {
  return <><div className="pt-20" /><main>{children}</main></>
  return (
    <>
      {/* CART POPUP */}
      <header className="bg-white bg-blend-saturation backdrop-saturate-150 backdrop-blur-xl sticky w-full z-50">
        <div className="navbar container">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 w-52 rounded-md"
              >
                <li className="rounded-sm">
                  <Link href="/">Home</Link>
                </li>
                <li className="rounded-sm">
                  <Link href="/products">Products</Link>
                </li>
                <li className="rounded-sm">
                  <Link href="/shop">Shop</Link>
                </li>
                <li className="rounded-sm">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link href={"/"} className="normal-case text-xl">
              <img
                src="//dot-shop.vercel.app/dot-logo.svg"
                alt="Dot Shop"
                className="max-w-[100px]"
              />
            </Link>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <label htmlFor="cart-modal" className="indicator">
                <AiOutlineShoppingCart size={24} />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </label>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>{children}</main>
      <footer className="py-3 border-t-2 border-dashed border-slate-300 text-center">
        <div className="container">
          <p className="font-medium text-xl font-mono text-slate-900 tracking-wider">
            👋 Developed by
            <a
              href={PORTFOLIO}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-wavy hover:decoration-double underline-offset-4 decoration-slate-700 ml-2"
            >
              @sakib
            </a>
          </p>
        </div>
      </footer>
      <CartModal />
    </>
  );
}
