import { useState } from "react";

export function MenuDropdown({
  menu = (toggler) => "Dropdown",
  dropdownClass = "",
  subMenu = [],
  renderChildren = (item,key) => {},
}) {
  const [show, setShow] = useState(false);

  function toggler() {
    setShow((e) => !e);
    console.log("😒😒😒")
  }

  return (
    <>
      {typeof menu === "function" ? menu(toggler) : menu}
      <div
        className={` relative md:absolute top-full left-0 md:max-h-96 bg-indigo-600 text-white w-full overflow-auto ${dropdownClass} ${show?"h-auto py-0":"h-0 py-0"} md:h-auto`}
      >
        {subMenu.map(renderChildren)}
      </div>
    </>
  );
}
