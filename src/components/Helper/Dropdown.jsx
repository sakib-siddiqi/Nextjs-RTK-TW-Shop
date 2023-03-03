import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const default_theme = {
  button: "bg-slate-800 hover:bg-slate-700 text-white focus:outline-2",
};
function defaultOption({ children }) {
  return ({ active }) => (
    <button
      className={`${active ? "bg-white/10 text-white" : "text-white/80"} whitespace-nowrap group flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold`}
    >
      {children || "TEXT"}
    </button>
  );
}

export default function Dropdown({
  buttonClass = "",
  menuClass = "",
  title,
  from,
  menu = [],
  renderOption,
}) {
  if (!renderOption || !renderOptionI()) {
    renderOption = defaultOption;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`inline-flex w-full justify-center items-center gap-1 rounded-md px-4 py-2 text-sm font-medium outline-offset-2 outline-slate-500 ${default_theme.button} ${buttonClass}`}
        >
          {title}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        className="z-50 py-1 shadow-xl shadow-slate-700/30"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute mt-1 min-w-[140px] ${from||"left-0"} origin-top-right divide-y divide-slate-50 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}>
          <div className="px-1 py-1 ">
            {menu.map((item, key) => (
              <Menu.Item key={key}>
                {renderOption({ children: item })}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
