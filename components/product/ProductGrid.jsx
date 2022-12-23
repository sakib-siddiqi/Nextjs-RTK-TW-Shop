import Image from "next/image";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineOpenWith } from "react-icons/md";

export function ProductCard({ product = {} }) {
  return (
    <figure className="p-1 bg-white border-2 rounded-md border-rose-300 relative pb-6 mb-4">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="w-full object-contain object-center max-h-44 mb-2 text-slate-800 rounded-md border-2 border-rose-100"
      />
      <h4
        className="text-sm tracking-wide font-semibold truncate"
        title={product?.title || ""}
      >
        {product.title || "___"}
      </h4>
      <div className=" flex gap-3 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ">
        <button className="bg-gradient-to-b from-rose-500 to-rose-700 active:from-rose-500 active:to-rose-900 text-white pl-3 p-2 h-auto min-h-[auto] rounded-full ring-2 ring-offset-2 ring-rose-300">
          <FaCartArrowDown className="-ml-1" />
        </button>
        <button className="bg-gradient-to-b from-rose-500 to-rose-700 active:from-rose-700 active:to-rose-900 text-white pl-3 p-2 h-auto min-h-[auto] rounded-full ring-2 ring-offset-2 ring-rose-300">
          <MdOutlineOpenWith className="-ml-1" />
        </button>
      </div>
    </figure>
  );
}

const ProductGrid = ({ className, products, error }) => {
  console.log({ products, error });
  return (
    <div
      className={`container gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;