// import React from "react";
import { NavLink } from "react-router-dom";
import { Users, Building2 } from "lucide-react";
import { useGlobalContext } from "../../context";
import MenuButton from "../MenuIcon";

const navigation = [
  //   { name: "Department", href: "/department", icon: LayoutDashboard },
  { name: "Department", href: "/departments", icon: Building2 },
  { name: "Admin viewer", href: "/admins", icon: Users },
  //   { name: "Programs", href: "/programs", icon: GraduationCap },
  //   { name: "Events", href: "/events", icon: Calendar },
  //   { name: 'Banner Images', href: '/banners', icon: Image },
];

export function Sidebar() {
  //   const { state } = useAuth();
  const { loggedInAdmin, openSideBar, setOpenSideBar } = useGlobalContext();

  return (
    <div
      className={`${
        openSideBar ? "left-0" : "left-[-100%]"
      } transition-all flex h-screen w-[100vw] absolute lg:relative lg:w-64  lg:left-0 flex-col bg-gray-900 z-100`}
    >
      <div className="p-4 flex h-16 items-center justify-between border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">College Admin</h1>
        <MenuButton />
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => {
                setOpenSideBar(false);
              }}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
              <span className="text-sm font-medium text-white capitalize">
                {loggedInAdmin?.username.slice(0, 1)}
              </span>
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {loggedInAdmin?.username}
            </p>
            <p className="text-xs text-gray-400">{loggedInAdmin?.email}</p>
            <p className="text-xs text-gray-400">{loggedInAdmin?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
