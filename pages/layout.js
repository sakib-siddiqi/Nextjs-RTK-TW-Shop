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
    <header className="py-2 sticky top-0 bg-white/80 z-[1000] backdrop-blur-md backdrop-saturate-150">
      <div className="container flex flex-wrap gap-4">
        <img
          src={DOMAIN + "head-beat.png"}
          alt="Head Beat"
          className="w-full max-w-[160px]"
        />
        <div className="flex-grow flex justify-between gap-2 items-center">
          <div
            className={`fixed top-0 left-0 h-screen w-full bg-slate-900/30 duration-200 md:hidden ${
              !show && "hidden"
            }`}
            onClick={onToggle}
          />
          <ul
            className={`flex md:flex-wrap flex-col md:flex-row md:items-center p-2 md:p-0 gap-1 md:gap-3 font-semibold text-slate-600 md:ml-4 fixed md:relative top-0 left-0 h-screen md:h-auto w-11/12 md:w-auto overflow-auto md:overflow-visible bg-slate-800 md:bg-transparent max-w-xs md:max-w-none duration-200 ${
              show ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <li>
              <div className="relative group">
                <MenuDropdown
                  menu={(toggler) => (
                    <span
                      onClick={toggler}
                      className="block p-2 cursor-pointer text-white/80 md:text-slate-800  hover:text-white md:hover:text-slate-900 bg-transparent hover:bg-white/10 rounded-md"
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
                  renderChildren={(item) => (
                    <Link
                      href={"/"}
                      className="block py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 whitespace-nowrap"
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
            className="md:hidden p-2 center text-xl ml-auto active:bg-indigo-50 rounded-lg"
            onClick={onToggle}
          >
            <RiMenu4Fill className="inline-block" />
          </button>
          <ul className="hidden md:flex gap-2 flex-wrap flex-row items-center">
            <form className="flex divide-x overflow-hidden divide-slate-200 rounded-md border border-slate-200 hover:border-slate-400 focus:border-slate-400 ">
              <input
                type="search"
                name="search"
                placeholder="Search product"
                className="outline-0 px-2 py-1 bg-transparent"
              />
              <button className="px-2 py-1 center">
                <BsSearch className="inline-block" />
              </button>
            </form>
            <Link
              href={"/auth/user"}
              className="rounded-md p-2 center bg-slate-100 text-slate-800"
            >
              <FaUser />
            </Link>
            <Link
              href={"/auth/user"}
              className="relative rounded-md p-2 center bg-slate-100 text-slate-800 "
            >
              <span class="flex h-3 w-3 absolute top-0 right-0 translate-x-1/2  -translate-y-1/2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3  bg-gradient-to-r from-sky-400 to-indigo-500"></span>
              </span>
              <ImCart />
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default function layout({ children }) {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-500 to-indigo-400 py-1 text-white">
        <div className="container">
          <p className="">
            <b className="font-medium">40%</b> Discount offer is going on.{" "}
          </p>
        </div>
      </section>
      <Header />
      <main>{children}</main>
    </>
  );
}
