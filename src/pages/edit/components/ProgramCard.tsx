import { useState } from "react";
import { Dialog } from "./Dialog";
import { useGlobalContext } from "../../../context";
import { Trash2, Edit, GraduationCap, PlusCircle } from "lucide-react";
import AddEcontentForm from "../forms/AddEcontentForm";
import EditProgramForm from "../forms/EditProgramForm";
import { ProgramType } from "../../../types";

interface params {
  program: ProgramType;
  deleteProgram: (id: string) => Promise<boolean>;
}

const ProgramCard = ({ program, deleteProgram }: params) => {
  const {} = useGlobalContext();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAddEcontentDialogOpen, setIsAddEcontentDialogOpen] =
    useState<boolean>(false);

  return (
    <div
      key={program._id}
      className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
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
      <Dialog
        isOpen={isAddEcontentDialogOpen}
        onClose={() => {
          setIsAddEcontentDialogOpen(false);
        }}
        title="Add E-content"
      >
        <AddEcontentForm programData={program} />
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
      <div className="flex flex-row gap-3 my-4">
        <button
          onClick={() => setIsAddEcontentDialogOpen(true)}
          className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
        >
          <PlusCircle />
          <p className="font-semibold">Add New Econtent</p>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
