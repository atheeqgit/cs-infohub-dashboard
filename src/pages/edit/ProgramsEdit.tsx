import { useState } from "react";
import { useGlobalContext } from "../../context";
import { Dialog } from "./components/Dialog";
import AddProgramForm from "./forms/AddProgramForm";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import ProgramCard from "./components/ProgramCard";

const ProgramEdit = () => {
  const {
    allProgramsData,
    loggedInAdmin,
    notify,
    baseUrl,
    getAllProgramData,
    setIsLoading,
  } = useGlobalContext();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const deleteProgram = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${baseUrl}/programs/delete-program/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
          },
        } // Add protocol
      );
      notify(response.data.message, true);
      getAllProgramData();
      return true;
    } catch (err: any) {
      notify(err.message, false);
      console.error("program deletion failed:", err);
      return false;
    } finally {
      setIsLoading(false);
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
              <ProgramCard program={program} deleteProgram={deleteProgram} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramEdit;
