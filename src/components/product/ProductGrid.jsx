import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { add_to_cart } from "../../redux/slices/cart.slice";

export function ProductCard({ product = {} }) {
  const [src, setSrc] = useState(product.images[0]);
  const dispatch = useDispatch();
  function on_add_to_cart() {
    dispatch(add_to_cart(product));
  }

  return (
    <figure
      className="group p-2 pb-4 bg-white rounded-md relative mb-2 border border-slate-200 "
      onMouseOver={() => {
        setSrc(product.images[1]);
      }}
      onMouseOut={() => {
        setSrc(product.images[0]);
      }}
    >
      <button className="absolute group/heart-btn top-2 right-2 inline-flex justify-center items-center border-2 border-slate-200 hover:border-rose-300 duration-300 text-rose-500 p-2 rounded-full text-lg z-10">
        <BsSuitHeartFill className="group-hover/heart-btn:animate-bounce" />
      </button>
      <Link href={`/products/${product?._id}`} className="block z-0">
        <div className="py-3 relative max-h-60">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={300}
            height={300}
            className="w-full object-contain object-center max-h-52 aspect-square mb-2 md:group-hover:opacity-0 transition-opacity duration-500"
          />
          <Image
            src={product.images[1]}
            alt={product.title}
            width={300}
            height={300}
            className="w-full z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain object-center max-h-52 aspect-square mb-2 opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-500"
          />
        </div>

        <h4
          className="text-lg tracking-wide font-semibold truncate"
          title={product?.title || ""}
        >
          {product.title}
        </h4>
        <p className="text-sm text-slate-500 tracking-wide mb-2 truncate">
          {product.desc}
        </p>
      </Link>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-lg font-bold tracking-wide">$100</span>
        <span className="text-sm font-semibold inline-flex justify-center items-center text-slate-500">
          <IoStarSharp className="text-orange-500 inline-block" />{" "}
          {product.rating.value}({product.rating.count})
        </span>
        <button className="py-2 px-4 hover:bg-indigo-600 hover:text-white transition-all duration-200 text-sm font-semibold tracking-wide text-indigo-700 border-2 border-indigo-400 rounded-full">
          Add to Cart
        </button>
      </div>
      {/*  <div className=" flex gap-3 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ">
     <button
          className="bg-gradient-to-b from-indigo-500 to-indigo-700 active:from-indigo-500 active:to-indigo-900 text-white pl-3 p-2 h-auto min-h-[auto] rounded-full ring-2 ring-offset-2 ring-indigo-300"
          onClick={on_add_to_cart}
        >
          <FaCartArrowDown className="-ml-1" />
        </button> 
        <Link
          href={`/products/${product?._id}`}
          className="bg-gradient-to-b from-indigo-500 to-indigo-700 active:from-indigo-700 active:to-indigo-900 text-white pl-3 p-2  min-h-[auto] rounded-full ring-2 ring-offset-2 ring-indigo-300"
        >
          <MdOutlineOpenWith className="-ml-1" />
        </Link>
      </div> */}
    </figure>
  );
}

const ProductGrid = ({ className, products = [], error }) => {
  if (error || !Array.isArray(products))
    return error || "`products` is not an array";
  return (
    <div
      className={`container gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {[...products]?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
