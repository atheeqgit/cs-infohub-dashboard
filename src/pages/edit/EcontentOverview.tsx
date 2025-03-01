import { useState } from "react";
import { useGlobalContext } from "../../context";
import { Dialog } from "./components/Dialog";
import AddProgramForm from "./forms/AddProgramForm";
import { Edit, GraduationCap, PlusCircle, Trash2 } from "lucide-react";
import EditProgramForm from "./forms/EditProgramForm";
import axios from "axios";

const ProgramEdit = () => {
  const { allProgramsData, loggedInAdmin, notify, baseUrl, getAllProgramData } =
    useGlobalContext();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const deleteProgram = async (id: string) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/programs/delete-program/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
          },
        } // Add protocol
      );
      notify(response.data.message, true);
      setIsDeleteDialogOpen(false);
      getAllProgramData();
    } catch (err: any) {
      notify(err.message, false);
      console.error("program deletion failed:", err);
    } finally {
    }
  };

  return (
    <div className="section-px section-py">
      {/* Dropdown for Filtering */}
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          // setSelectedDepartment(null);
        }}
        title="Add Program"
      >
        <AddProgramForm setIsAddDialogOpen={setIsAddDialogOpen} />
      </Dialog>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
              <p className="mt-2 text-sm text-gray-700">
                Select a program to view its semesters and content
              </p>
            </div>
            <div className="flex flex-row gap-3 my-4">
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
              >
                <PlusCircle />
                <p className="font-semibold">Add New program</p>
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProgramsData?.map((program) => (
              <div
                key={program._id}
                className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <Dialog
                  isOpen={isEditDialogOpen}
                  onClose={() => {
                    setIsEditDialogOpen(false);
                    // setSelectedDepartment(null);
                  }}
                  title="Edit Program"
                >
                  <EditProgramForm
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    programData={program}
                  />
                </Dialog>
                <Dialog
                  isOpen={isDeleteDialogOpen}
                  onClose={() => {
                    setIsDeleteDialogOpen(false);
                  }}
                  title="delete Program"
                >
                  <div className="flex flex-row w-full gap-2">
                    <button
                      className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80  border hover:border-2 border-solid hover:shadow-lg transition-shadow w-full justify-center border-red-600 "
                      onClick={() => {
                        deleteProgram(program._id);
                      }}
                    >
                      <Trash2 color="red" /> <p>Delete</p>
                    </button>
                    <button
                      onClick={() => setIsDeleteDialogOpen(false)}
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
                        <GraduationCap className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {program.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {program.totalSemesters} semesters
                  </p>
                  <p className="text-sm text-gray-500">
                    Type :{program.programType} programme
                  </p>
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
    </div>
  );
};

export default ProgramEdit;
