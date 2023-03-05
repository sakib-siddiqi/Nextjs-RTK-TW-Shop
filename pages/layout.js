import Link from "next/link";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import { RiMenu4Fill } from "react-icons/ri";
import { MenuDropdown } from "../src/components/Helper/Menu";
import { DOMAIN } from "../src/utils/const";
const PORTFOLIO = "https://sakib-siddiqi.netlify.app/";

function Header() {
  const [show, setShow] = useState(false);
  function onToggle() {
    setShow((e) => !e);
  }
  return (
    <>
      {!show && (
        <section className="bg-gradient-to-r from-purple-500 to-indigo-400 py-1 text-white">
          <div className="container">
            <p className="">
              <b className="font-medium">40%</b> Discount offer is going on.{" "}
            </p>
          </div>
        </section>
      )}
      <header className="sticky top-0 z-[1000] bg-white/80 py-2 backdrop-blur-md backdrop-saturate-150">
        <div className="container flex flex-wrap gap-4">
          <Link href="/">
            <img
              src={DOMAIN + "head-beat.png"}
              alt="Head Beat"
              className="w-full max-w-[160px]"
            />
          </Link>
          <div className="flex flex-grow items-center justify-between gap-2">
            <div
              className={`fixed top-0 left-0 h-screen w-full bg-slate-900/30 duration-200 md:hidden ${!show && "hidden"}`}
              onClick={onToggle}
            />
            <ul
              className={`fixed top-0 left-0 flex h-screen w-11/12 max-w-xs flex-col gap-1 overflow-auto bg-slate-800 p-2 font-semibold text-slate-600 duration-200 md:relative md:ml-4 md:h-auto md:w-auto md:max-w-none md:flex-row md:flex-wrap md:items-center md:gap-3 md:overflow-visible md:bg-transparent md:p-0 ${
                show ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0`}
            >
              <li>
                <div className="group relative">
                  <MenuDropdown
                    menu={(toggler) => (
                      <span
                        onClick={toggler}
                        className="block cursor-pointer rounded-md bg-transparent p-2  text-white/80 hover:bg-white/10 hover:text-white md:text-slate-800 md:hover:text-slate-900"
                      >
                        Categories{" "}
                        <BiDownArrow className="inline-block text-sm" />
                      </span>
                    )}
                    dropdownClass=" md:opacity-0 md:invisible md:top-[130%] md:group-hover:top-full md:group-hover:visible md:group-hover:opacity-100 w-full md:w-fit rounded-[4px] bg-slate-800 p-0 min-w-[150px] max-w-xs bg-white/5 md:bg-slate-800 shadow-lg shadow-slate-900/50 duration-300"
                    subMenu={[
                      "Sakib Siddiqi Supto",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                      "Hello",
                      "sami",
                    ]}
                    renderChildren={(item,key) => (
                      <Link
                        key={key}
                        href={"/"}
                        className="block whitespace-nowrap py-2 px-4 text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        {item}
                      </Link>
                    )}
                  />
                </div>
              </li>
              <li>
                <Link href="/" className="nav-menu-link">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/" className="nav-menu-link">
                  Offers
                </Link>
              </li>
            </ul>
            <button
              className="center ml-auto rounded-lg p-2 text-xl active:bg-indigo-50 md:hidden"
              onClick={onToggle}
            >
              <RiMenu4Fill className="inline-block" />
            </button>
            <div className="hidden flex-row flex-wrap items-center gap-2 md:flex">
              <form className="flex divide-x divide-slate-200 overflow-hidden rounded-md border border-slate-200 hover:border-slate-400 focus:border-slate-400 ">
                <input
                  type="search"
                  name="search"
                  placeholder="Search product"
                  className="bg-transparent px-2 py-1 outline-0"
                />
                <button className="center px-2 py-1">
                  <BsSearch className="inline-block" />
                </button>
              </form>
              <Link
                href={"/auth/user"}
                className="center rounded-md bg-slate-100 p-2 text-slate-800"
              >
                <FaUser />
              </Link>
              <Link
                href={"cart"}
                className="center relative rounded-md bg-slate-100 p-2 text-slate-800 "
              >
                <span className="absolute top-0 right-0 flex h-3 w-3 translate-x-1/2  -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full  bg-gradient-to-r from-sky-400 to-indigo-500"></span>
                </span>
                <ImCart />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default function layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
