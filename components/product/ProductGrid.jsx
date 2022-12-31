import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineOpenWith } from "react-icons/md";
import { useDispatch } from "react-redux";
import { add_to_cart } from "../../redux/slices/cart.slice";

export function ProductCard({ product = {} }) {
  const dispatch = useDispatch();
  function on_add_to_cart() {
    dispatch(add_to_cart(product));
  }

  return (
    <figure className="p-1 bg-white border-2 rounded-md border-indigo-300 relative pb-6 mb-4">
      <Link href={`/products/${product?._id}`} className="block">
        <Image
          src={product.images?.[0]}
          alt={product.title}
          width={300}
          height={300}
          className="w-full object-contain object-center max-h-44 mb-2 text-slate-800 rounded-md border-2 border-indigo-100"
        />
        <h4
          className="text-sm tracking-wide font-semibold truncate"
          title={product?.title || ""}
        >
          {product.title || "___"}
        </h4>
      </Link>
      <div className=" flex gap-3 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ">
        <button
          className="bg-gradient-to-b from-indigo-500 to-indigo-700 active:from-indigo-500 active:to-indigo-900 text-white pl-3 p-2 h-auto min-h-[auto] rounded-full ring-2 ring-offset-2 ring-indigo-300"
          onClick={on_add_to_cart}
        >
          <FaCartArrowDown className="-ml-1" />
        </button>
        {/* <Link
          href={`/shop/${product?._id}`}
          className="bg-gradient-to-b from-indigo-500 to-indigo-700 active:from-indigo-700 active:to-indigo-900 text-white pl-3 p-2 h-auto min-h-[auto] rounded-full ring-2 ring-offset-2 ring-indigo-300"
        >
          <MdOutlineOpenWith className="-ml-1" />
        </Link> */}
        <Link
          href={`/products/${product?._id}`}
          className="bg-gradient-to-b from-indigo-500 to-indigo-700 active:from-indigo-700 active:to-indigo-900 text-white pl-3 p-2  min-h-[auto] rounded-full ring-2 ring-offset-2 ring-indigo-300"
        >
          <MdOutlineOpenWith className="-ml-1" />
        </Link>
      </div>
    </figure>
  );
}

const ProductGrid = ({ className, products = [], error }) => {
  console.log({ products });
  if (error || !Array.isArray(products))
    return error || "`products` is not an array";
  return (
    <div
      className={`container gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {[...products]?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
