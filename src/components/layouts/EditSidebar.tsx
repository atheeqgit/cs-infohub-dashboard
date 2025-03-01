import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Building2,
} from "lucide-react";
import { useGlobalContext } from "../../context";
import MenuButton from "../MenuIcon";

interface params {
  deptID: string;
  pathName: string;
}

export function EditSidebar({ deptID, pathName }: params) {
  //   const { state } = useAuth();
  const { setEditDeptData, openSideBar, setOpenSideBar } = useGlobalContext();

  const navigation = [
    {
      name: "Department",
      href: `/edit/${pathName}/${deptID}`,
      icon: Building2,
    },
    { name: "Faculty", href: "faculty", icon: Users },
    { name: "Events", href: "events", icon: Calendar },
    { name: "Programs", href: "programs", icon: GraduationCap },
    //   { name: 'Banner Images', href: '/banners', icon: Image },
  ];

  useEffect(() => {
    if (deptID && pathName) setEditDeptData({ pathName, deptId: deptID });
  }, [pathName, deptID]);

  return (
    <div
      className={`${
        openSideBar ? "left-0" : "left-[-100%]"
      } transition-all flex h-screen w-[100vw] absolute lg:relative lg:w-64  lg:left-0 flex-col bg-gray-900 z-100`}
    >
      <div className="p-4 flex h-16 items-center justify-between border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Edit department</h1>
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
        <NavLink
          to="/"
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
          <LayoutDashboard className="mr-3 h-5 w-5" />
          go main dashboard
        </NavLink>
      </div>
    </div>
  );
}
