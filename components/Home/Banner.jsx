import Image from "next/image";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";

const Banner = () => {
  return (
    <section className=" pt-16">
      <div className="container">
        <div className="bg-gradient-to-br from-indigo-200 to-rose-300 my-3 rounded-lg shadow-lg shadow-slate-900/20 p-10 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 order-2 md:order-1">
            <h1 className="text-7xl text-slate-900  font-cinzel font-thin tracking-wider mb-5">
              Winter Offer.
            </h1>
            <p className="text-slate-800 text-xl max-w-lg tracking-wide font-medium mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sequi
              suscipit in tenetur distinctio. Nulla ex placeat vero saepe sed
              architecto magnam natus, eos voluptas quas doloremque alias. In,
              ipsum?
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href={"/shop"}
                className="btn btn-primary shadow-xl shadow-indigo-600/30 hover:shadow-indigo-700/40"
              >
                Shop Now <FaOpencart className="ml-3 h-8 w-6" />
              </Link>
            </div>
          </div>
          <Image
            src="/banner-girl.png"
            height={500}
            width={500}
            className="w-full  order-1 md:order-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
