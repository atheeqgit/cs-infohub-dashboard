// import React, { useEffect } from "react";
import { EditSidebar } from "./EditSidebar";
import { Outlet, useParams } from "react-router-dom";
import MenuButton from "../MenuIcon";

const EditLayout = () => {
  const { pathName, deptID } = useParams();

  return (
    <div className="w-[100vw] flex h-screen bg-gray-100">
      <EditSidebar pathName={pathName!} deptID={deptID!} />
      <main className="flex-1 overflow-auto  p-3 md:p-8">
        <MenuButton />
        <Outlet />
      </main>
    </div>
  );
};

export default EditLayout;
