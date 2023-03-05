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
import { DEMO_PRODUCT } from "..";
import watch_photo from "../../src/assets/images/watch-photoshoot.jpg";
import { add_to_cart } from "../../src/redux/slices/cart.slice";
import { DOMAIN } from "../../src/utils/const";
import { numberWithCommas } from "../../src/utils/tools";

export default function SingleProduct({ data = {} }) {
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-8 lg:grid-cols-10">
            <div className="col-span-10 md:col-span-3 lg:col-span-4">
              <Image
                src={data?.images?.[1] || data?.images?.[0]}
                alt=""
                className=" aspect-[83/77] rounded-lg border-2 border-dashed border-indigo-500 object-cover object-center shadow-2xl shadow-indigo-300/25"
                height={500}
                width={500}
              />
            </div>
            <div className="col-span-10 md:col-span-5 lg:col-span-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 md:mb-10">
                meistersinger
              </p>
              <div className="mb-4 flex gap-3 md:mb-14">
                <div className="grow">
                  <h2 className="mb-10 text-3xl font-bold tracking-wide text-slate-700">
                    {data?.title}
                  </h2>
                  <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5">
                    <p className="font-medium  tracking-wide text-slate-600">
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
                      <p className="font-medium tracking-wide text-slate-600">
                        4.9 Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="grid h-12 w-12 place-items-center rounded-full bg-white text-2xl text-indigo-900 shadow-xl shadow-indigo-500/10 duration-300 hover:shadow-indigo-600/25"
                    onClick={onShare}
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
              </div>
              <div className="mb-8 flex flex-wrap items-center gap-9 md:mb-10">
                <button
                  className="relative  inline-flex justify-center gap-2 rounded-full bg-indigo-500 py-4 px-6 align-middle font-semibold tracking-wider text-white hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2"
                  onClick={onAddToCart}
                >
                  {data.cart_count > 0 && (
                    <span className="absolute top-0 right-0 inline-grid h-6 w-6 -translate-y-1/3 place-items-center rounded-full bg-indigo-800 text-xs font-semibold text-white ring-2 ring-indigo-50">
                      {data.cart_count}
                    </span>
                  )}
                  <RiShoppingBagFill className="inline-block h-5 w-5" /> Add TO
                  BAG
                </button>
                <p className="text-2xl font-bold tracking-wide  text-slate-800">
                  <span className="text-mono text-[14px] underline decoration-indigo-700 decoration-2 underline-offset-2">
                    ট
                  </span>{" "}
                  {numberWithCommas(data?.price || 0)}
                </p>
              </div>
              <hr className="my-5 h-[1px] border-0 bg-indigo-300" />
              <div className="grid grid-cols-2 gap-x-3 gap-y-8">
                <div className="flex flex-col items-start gap-1  text-lg font-semibold capitalize tracking-wide text-slate-500  md:flex-row md:items-center md:gap-2 lg:gap-3">
                  <span>
                    <BsBuilding className="h-6 w-6" />
                  </span>
                  <p>Locate a store near you.</p>
                </div>
                <div className=" flex flex-col items-start gap-1 text-lg font-semibold capitalize tracking-wide text-slate-500  md:flex-row md:items-center md:gap-2 lg:gap-3">
                  <span>
                    <MdPeopleAlt className="h-6 w-6" />
                  </span>
                  <p>Speak with an Expert</p>
                </div>
                <div className="flex flex-col items-start gap-1 text-lg font-semibold capitalize tracking-wide text-slate-500  md:flex-row md:items-center md:gap-2 lg:gap-3">
                  <span>
                    <MdDownload className="h-6 w-6" />
                  </span>
                  <p>Download guide size.</p>
                </div>
                <div className="flex flex-col items-start gap-1 text-lg font-semibold capitalize tracking-wide text-slate-500  md:flex-row md:items-center md:gap-2 lg:gap-3">
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
      <section className="bg-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-wide text-indigo-600 ">
                Full Specification
              </h2>
              <hr className="my-2 h-[1px] rounded-lg border-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
              <div className="my-5 grid grid-cols-2 md:grid-cols-3">
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Name</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    MEISTERSINGER
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Color</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    Indigo
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Warranty</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    3 Years
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Name</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    MEISTERSINGER
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Color</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    Indigo
                  </p>
                </div>
                <div className=" p-4 ">
                  <p className="mb-2 text-slate-400">Warranty</p>
                  <p className="font-semibold tracking-wide text-slate-800">
                    3 Years
                  </p>
                </div>
              </div>
              <div className=" overflow-auto leading-6 tracking-wide text-slate-500">
                {[...Array(6)].map((_,key) => (
                  <p className=" mb-4" key={key}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Illo totam distinctio ut debitis iste velit culpa quos amet
                    quis earum voluptatibus vero tenetur consequuntur sed
                    facere, odio a molestias omnis.
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-wide text-slate-700 ">
                Brand Video
              </h2>
              <hr className="my-2 h-[1px] rounded-lg border-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
              <div className="relative rounded-lg">
                <Image
                  src={watch_photo}
                  alt=""
                  className="aspect-video w-full rounded-lg object-cover brightness-75"
                />
                <button className="absolute top-1/2 left-1/2 inline-grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-t from-cyan-700 to-cyan-500 text-white shadow-2xl shadow-indigo-400 ring-[15px] ring-indigo-300/25">
                  <BsFillPlayFill className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context?.params?.id;
  if (!id) {
    throw new Error(`ID is invalid ${id}`);
  }
  const URL = `${DOMAIN}/api/v1/products/${id}`;
  try {
    const { data } = await axios.get(URL);
    return { props: { data: DEMO_PRODUCT } };
  } catch (error) {
    return {
      notFound: true,
      data: {},
    };
  }
}
