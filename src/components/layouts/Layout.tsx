// import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
// import { ChevronRight, LayoutDashboard, Menu } from "lucide-react";
// import { useGlobalContext } from "../../context";
import MenuButton from "../MenuIcon";

export function Layout() {
  // const { setOpenSideBar } = useGlobalContext();
  return (
    <div className="flex w-[100vw] h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-auto p-3 md:p-8 bg-">
        <MenuButton />
        <Outlet />
      </main>
    </div>
  );
}
