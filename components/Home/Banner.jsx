import Image from "next/image";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="bg-pink-200 pt-16">
      <div className="container py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 order-2 md:order-1">
          <h1 className="text-7xl text-pink-900  font-cinzel font-bold tracking-wider mb-5">
            Winter Offer.
          </h1>
          <p className="text-pink-900 text-lg max-w-md tracking-wide font-normal mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sequi
            suscipit in tenetur distinctio. Nulla ex placeat vero saepe sed
            architecto magnam natus, eos voluptas quas doloremque alias. In,
            ipsum?
          </p>
          <div className="flex gap-4">
            <Link href={"/shop"} className="btn btn-secondary">
              Shop Now  <FaOpencart className="ml-3 h-8 w-6" />
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
    </section>
  );
};

export default Banner;
