import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi2";
import boy from "../../assets/images/banner-boy.png";
import girl from "../../assets/images/banner-girl.png";

const Banner = () => {
  return (
    <section className="py-5">
      <div className="container  grid grid-cols-8 items-end bg-gradient-to-r from-pink-100 via-indigo-50 to-purple-200 rounded-md shadow-md shadow-indigo-300/20 pt-6 md:pt-0">
        <Image src={boy} alt="" className="w-full col-span-4 md:col-span-2 order-2 md:order-1" />
        <div className="text-center col-span-8 md:col-span-4 h-full flex flex-col gap-2 justify-center items-center  order-1 md:order-2">
          <h1 className="text-4xl md:text-7xl text-indigo-600 font-semibold">40% Off on</h1>
          <h2 className="text-lg md:text-2xl text-purple-800 font-semibold mb-3">Selected Headphone</h2>
          <button className="rounded-full py-3 px-6 tracking-wide font-bold bg-indigo-500 ring-4 ring-indigo-200 inline-flex flex-row justify-center items-center text-white">
          BUY NOW <HiShoppingCart className="inline-block ml-2 text-xl" />
          </button>
        </div>
        <Image src={girl} alt="" className="w-full col-span-4 md:col-span-2  order-3" />
      </div>
    </section>
  );
};

export default Banner;
