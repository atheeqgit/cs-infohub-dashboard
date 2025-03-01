// import React from "react";
import { useGlobalContext } from "../context";
import { Menu, X } from "lucide-react";

const MenuButton = () => {
  const { setOpenSideBar, openSideBar } = useGlobalContext();
  return (
    <div
      className="p-2 rounded-xl bg-gray-900 w-fit lg:hidden"
      onClick={() => {
        setOpenSideBar(!openSideBar);
      }}
    >
      {openSideBar ? (
        <X className="w-5 h-5 text-white " />
      ) : (
        <Menu className="w-5 h-5 text-white " />
      )}
    </div>
  );
};

export default MenuButton;
