import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsFillPlayFill } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdDownload, MdPeopleAlt } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import watch_photo from "../../assets/images/watch-photoshoot.jpg";
import { BASE_API_ROUTE } from "../../const";
import { add_to_cart } from "../../redux/slices/cart.slice";
import { numberWithCommas } from "../../tools";

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
      data: {},
    };
  }
}

const SingleProduct = ({ data = {} }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cart);
  data.cart_count = useMemo(
    () => cart?.find((ele) => ele?.product_id === data?._id)?.count || 0,
    [cart]
  );
  function onAddToCart() {
    dispatch(add_to_cart(data));
  }
  function onShare() {
    const share_data = {
      title: data.title,
      text: data.details,
      url: window?.location?.href,
    };
    if (navigator.share && navigator.canShare(share_data)) {
      navigator.share(share_data);
    }
  }
  useEffect(() => {
    document?.body?.classList?.add("bg-indigo-50");
    return () => {
      document?.body.classList?.remove("bg-indigo-50");
    };
  }, []);
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta property="og:image" content={data?.image} />
        <meta property="og:title" content={data?.title + "- DOT SHOP"} />
        <meta
          property="og:description"
          content={
            "DOT shop, best online shop.<br/> Developed by @sakib.siddiqi.supto "
          }
        />
        <meta property="og:determiner" content="the" />
        <meta property="twitter:image" content={data?.image} />
        <meta property="twitter:title" content={data?.title + "- DOT SHOP"} />
        <meta property="twitter:title" content={data?.title + "- DOT SHOP"} />
        <meta
          property="twitter:description"
          content={
            data?.details ||
            "DOT shop, best online shop.<br/> Developed by @sakib.siddiqi.supto "
          }
        />
        <meta property="twitter:image" content={data?.image} />
        <meta property="twitter:title" content={data?.title + "- DOT SHOP"} />
        <meta property="twitter:title" content={data?.title + "- DOT SHOP"} />
        <meta
          property="twitter:description"
          content={
            data?.details ||
            "DOT shop, best online shop.<br/> Developed by @sakib.siddiqi.supto "
          }
        />
      </Head>
      <section className="pt-16 pb-4">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-8">
            <div className="col-span-10 md:col-span-3 lg:col-span-4">
              <Image
                src={data?.images?.[1] || data?.images?.[0]}
                alt=""
                className=" object-cover rounded-lg border-2 border-dashed border-indigo-500 object-center aspect-[83/77] shadow-2xl shadow-indigo-300/25"
                height={500}
                width={500}
              />
            </div>
            <div className="col-span-10 md:col-span-5 lg:col-span-6">
              <p className="font-semibold text-sm text-slate-600 tracking-wide uppercase mb-3 md:mb-10">
                meistersinger
              </p>
              <div className="flex gap-3 mb-4 md:mb-14">
                <div className="grow">
                  <h2 className="font-bold text-slate-700 tracking-wide text-3xl mb-10">
                    {data?.title}
                  </h2>
                  <div className="grid gap-5 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <p className="tracking-wide  font-medium text-slate-600">
                      L3QES4829
                    </p>
                    <div>
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-indigo-500"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-indigo-500"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-indigo-500"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-indigo-500"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium tracking-wide">
                        4.9 Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="rounded-full bg-white text-indigo-900 text-2xl h-12 w-12 grid place-items-center shadow-xl shadow-indigo-500/10 hover:shadow-indigo-600/25 duration-300"
                    onClick={onShare}
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
              </div>
              <div className="flex gap-9 flex-wrap items-center mb-8 md:mb-10">
                <button
                  className="bg-indigo-500  hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 py-4 px-6 rounded-full text-white tracking-wider font-semibold inline-flex gap-2 align-middle justify-center relative"
                  onClick={onAddToCart}
                >
                  {data.cart_count > 0 && (
                    <span className="h-6 w-6 inline-grid place-items-center rounded-full font-semibold text-xs bg-indigo-800 text-white absolute top-0 right-0 -translate-y-1/3 ring-2 ring-indigo-50">
                      {data.cart_count}
                    </span>
                  )}
                  <RiShoppingBagFill className="inline-block h-5 w-5" /> Add TO
                  BAG
                </button>
                <p className="text-slate-800 text-2xl font-bold  tracking-wide">
                  <span className="text-[14px] text-mono underline decoration-2 decoration-indigo-700 underline-offset-2">
                    ট
                  </span>{" "}
                  {numberWithCommas(data?.price || 0)}
                </p>
              </div>
              <hr className="my-5 border-0 h-[1px] bg-indigo-300" />
              <div className="grid grid-cols-2 gap-x-3 gap-y-8">
                <div className="capitalize flex flex-col md:flex-row  gap-1 md:gap-2 lg:gap-3 items-start md:items-center  text-slate-500 font-semibold tracking-wide text-lg">
                  <span>
                    <BsBuilding className="h-6 w-6" />
                  </span>
                  <p>Locate a store near you.</p>
                </div>
                <div className=" capitalize flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-3 items-start md:items-center  text-slate-500 font-semibold tracking-wide text-lg">
                  <span>
                    <MdPeopleAlt className="h-6 w-6" />
                  </span>
                  <p>Speak with an Expert</p>
                </div>
                <div className="capitalize flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-3 items-start md:items-center  text-slate-500 font-semibold tracking-wide text-lg">
                  <span>
                    <MdDownload className="h-6 w-6" />
                  </span>
                  <p>Download guide size.</p>
                </div>
                <div className="capitalize flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-3 items-start md:items-center  text-slate-500 font-semibold tracking-wide text-lg">
                  <span>
                    <AiOutlineCar className="h-6 w-6" />
                  </span>
                  <p>Fast shipping.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h2 className="text-indigo-600 text-2xl font-semibold tracking-wide ">
                Full Specification
              </h2>
              <hr className="border-0 my-2 bg-gradient-to-r from-transparent via-indigo-300 to-transparent h-[1px] rounded-lg" />
              <div className="grid grid-cols-2 md:grid-cols-3 my-5">
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Name</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    MEISTERSINGER
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Color</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    Indigo
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Warranty</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    3 Years
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Name</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    MEISTERSINGER
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Color</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    Indigo
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="text-slate-400 mb-2">Warranty</p>
                  <p className="text-slate-800 font-semibold tracking-wide">
                    3 Years
                  </p>
                </div>
              </div>
              <div className=" overflow-auto text-slate-500 tracking-wide leading-6">
                {[...Array(6)].map(() => (
                  <p className=" mb-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Illo totam distinctio ut debitis iste velit culpa quos amet
                    quis earum voluptatibus vero tenetur consequuntur sed
                    facere, odio a molestias omnis.
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="text-slate-700 text-2xl font-bold tracking-wide ">
                Brand Video
              </h2>
              <hr className="border-0 my-2 bg-gradient-to-r from-transparent via-indigo-300 to-transparent h-[1px] rounded-lg" />
              <div className="rounded-lg relative">
                <Image
                  src={watch_photo}
                  alt=""
                  className="rounded-lg w-full aspect-video object-cover brightness-75"
                />
                <button className="inline-grid h-14 w-14 rounded-full place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-cyan-700 to-cyan-500 text-white shadow-2xl shadow-indigo-400 ring-[15px] ring-indigo-300/25">
                  <BsFillPlayFill className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
