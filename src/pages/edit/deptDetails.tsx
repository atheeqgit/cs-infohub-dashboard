import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import LoadingScreen from "../../components/LoadingScreen";
import { Dialog } from "./components/Dialog";
import { Edit } from "lucide-react";
import EditDepartmentForm from "./forms/EditDepartmentForm";

const DeptDetails = () => {
  const { departmentData } = useGlobalContext();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  return (
    <div className="w-full">
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          // setSelectedDepartment(null);
        }}
        title="Edit Department"
      >
        <EditDepartmentForm deptData={departmentData} />
      </Dialog>

      {departmentData ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between gap-4 mb-6">
            <div className="flex flex-row justify-between gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">details</h1>
              <div className="flex flex-row gap-3 my-4">
                <button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
                >
                  <Edit />
                  <p className="font-semibold">edit Department</p>
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                department name :
              </h2>
              <p className="text-base font-medium text-gray-600">
                {departmentData.deptName}
              </p>
            </div>
            <div className="flex flex-col ">
              <h2 className="text-lg font-semibold text-gray-900">
                department About :
              </h2>

              {departmentData.about.map((abt, index) => {
                return (
                  <p
                    key={index}
                    className="text-base font-medium text-gray-600"
                  >
                    {abt.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col ">
              <h2 className="text-lg font-semibold text-gray-900">
                Snippet data :
              </h2>
              <p className="text-base font-medium text-gray-600">
                students count: {departmentData.snippetData.studentsCount}
              </p>
              <p className="text-base font-medium text-gray-600">
                staff Count: {departmentData.snippetData.staffsCount}
              </p>
              <p className="text-base font-medium text-gray-600">
                alumni Count: {departmentData.snippetData.alumniCount}
              </p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Related images
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={departmentData.aboutBG?.url}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    about page bg
                  </h3>
                  {/*  */}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={departmentData.facultyBG?.url}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    faculty page bg
                  </h3>
                  {/*  */}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={departmentData.eventsBG?.url}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    events page bg
                  </h3>
                  {/*  */}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={departmentData.deptIcon?.url}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    dept icon
                  </h3>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default DeptDetails;

// <div className="mt-2 flex items-center justify-between">
//   {/* <span
//     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//       banner.active
//         ? "bg-green-100 text-green-800"
//         : "bg-gray-100 text-gray-800"
//     }`}
//   >
//     {banner.active ? "Active" : "Inactive"}
//   </span> */}
//   <div className="flex space-x-2">
//     {/* <Button variant="ghost" size="sm">Edit</Button>
//   <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">Delete</Button> */}
//   </div>
// </div>
