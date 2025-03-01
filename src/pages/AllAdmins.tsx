import { useEffect, useState } from "react";
import { Edit, UserCircle, Plus, Trash2 } from "lucide-react";
import { useGlobalContext } from "../context";
import LoadingScreen from "../components/LoadingScreen";
import { Dialog } from "./edit/components/Dialog";
import AddAdminForm from "./Forms/AddAdminForm";

const AllAdmins = () => {
  const { loading, getAllAdmins, allAdminData } = useGlobalContext();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllAdmins();
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="py-6">
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          // setSelectedAdmin(null);
        }}
        title="Add Admin"
      >
        <AddAdminForm setIsAddDialogOpen={setIsAddDialogOpen} />
      </Dialog>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Admins</h1>
        <p className="mt-2 text-sm text-gray-700">
          you can view all the admins (only super admin can add/delete/edit
          admin details)
        </p>
        <div className="flex flex-row gap-3 my-4">
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
          >
            <Plus />
            <p className="font-semibold">Add admin</p>
          </button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allAdminData?.map((admin) => (
            <div
              key={admin._id}
              className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <Dialog
                isOpen={isEditDialogOpen}
                onClose={() => {
                  setIsEditDialogOpen(false);
                  // setSelectedDepartment(null);
                }}
                title="Edit Admin"
              >
                {/* <EditAdminForm
                setIsEditDialogOpen={setIsEditDialogOpen}
                adminData={admin}
              /> */}
                <h1>Edit admin</h1>
              </Dialog>
              <Dialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                  // setIsDeleteDialogOpen(false);
                }}
                title="delete Admin"
              >
                <div className="flex flex-row w-full gap-2">
                  <button
                    className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80  border hover:border-2 border-solid hover:shadow-lg transition-shadow w-full justify-center border-red-600 "
                    //   onClick={() => {
                    //     deleteAdmin(admin._id);
                    //   }}
                  >
                    <Trash2 color="red" /> <p>Delete</p>
                  </button>
                  <button
                    //   onClick={() => setIsDeleteDialogOpen(false)}
                    className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow w-full justify-center"
                  >
                    <Edit /> <p>Cancel</p>
                  </button>
                </div>
              </Dialog>
              <div className="flex items-start gap-2 flex-col space-x-4">
                <div className="flex flex-row gap-2">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                      <UserCircle className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {admin.username}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-gray-500">role :{admin.role}</p>
                <p className="text-sm text-gray-500">mail :{admin.email}</p>
                {admin.faculty && (
                  <p className="text-sm text-gray-500">admin is a faculty</p>
                )}
              </div>
              <div className="flex flex-row w-full">
                <button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow w-full justify-center "
                >
                  <Trash2 color="red" />
                </button>
                <button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow w-full justify-center"
                >
                  <Edit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
