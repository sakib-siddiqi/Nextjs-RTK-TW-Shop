import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const MENU = [
  {
    name: "Products",
    icon: null,
    href: "/dashboard/products",
  },
  {
    name: "Orders",
    icon: null,
    href: "/dashboard/orders",
  },
  {
    name: "Brands",
    icon: null,
    href: "/dashboard/brands",
  },
];

const Toggler = ({ icon, toggleSidebar }) => (
  <button
    className="p-2 bg-indigo-50 hover:bg-indigo-100 focus:bg-indigo-100  text-indigo-900 rounded-md border-2 border-dashed border-indigo-300 hover:border-indigo-500 focus:border-indigo-500 lg:hidden"
    onClick={() => toggleSidebar()}
  >
    {icon ? icon : <RxHamburgerMenu />}
  </button>
);
function Header({ open, toggleSidebar }) {
  const {pathname}=useRouter();
  return (
    <aside
      className={`min-w-[260px] fixed top-0 left-0 z-50 shadow-2xl shadow-indigo-900/60 lg:relative col-span-2 bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-md duration-300 h-[calc(100%_-_18px)] lg:h-auto ${
        open ? "m-2" : "m-2 -ml-72 lg:m-2"
      }`}
    >
      <div className="flex justify-between gap-2 flex-wrap mb-2">
        <h1 className="text-2xl font-bold tracking-wider text-white">DOTS</h1>{" "}
        <Toggler toggleSidebar={toggleSidebar} icon={<RxCross1 />} />
      </div>
      <hr />
      <nav className="py-3">
        {MENU?.map((menu, index) => (
          <Link
            key={index}
            href={menu.href}
            className={`block px-3 py-2 mb-2 font-semibold rounded-md tracking-wide border border-dashed focus:border-solid ${pathname.includes(menu.href)?
              "border-indigo-50/80 bg-indigo-100 hover:bg-indigo-100 text-slate-800"
              :"border-indigo-50/50  bg-indigo-100/5 hover:bg-indigo-100/20 text-indigo-50"}`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function Navbar({ toggleSidebar }) {
  return (
    <div className="py-2  sticky top-0 bg-white z-10">
      <nav className=" p-2 bg-gradient-to-l from-indigo-300 to-purple-500 rounded-md">
        <Toggler toggleSidebar={toggleSidebar} />{" "}
        <span className="text-2xl font-bold tracking-wider text-white">
          Admin Dashboard
        </span>
      </nav>
    </div>
  );
}

function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  function toggleSidebar(state) {
    setOpen((s) => (state ? state : !s));
  }
  return (
    <>
      <div className="flex flex-row h-full overflow-auto flex-grow justify-between">
        <Header toggleSidebar={toggleSidebar} open={open} />
        <main className="overflow-y-auto h-screen px-3 max-w-full">
          <Navbar toggleSidebar={toggleSidebar} />
          {children}
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
