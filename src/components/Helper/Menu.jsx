export function MenuDropdown({
  menu = "Dropdown",
  dropdownClass = "",
  subMenu = [],
  renderChildren = (item) => {},
}) {
  return (
    <div className="relative">
      {menu}
      <div
        className={`relative md:absolute top-full left-0 p-2 max-h-96 bg-indigo-600 text-white w-full overflow-auto ${dropdownClass}`}
      >
        {subMenu.map(renderChildren)}
      </div>
    </div>
  );
}
