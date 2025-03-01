import { useState } from "react";
import { useGlobalContext } from "../../context";
import FacultyCard from "./components/FacultyCard";
import { Dialog } from "./components/Dialog";
import AddFacultyForm from "./forms/AddFacultyForm";
import { PlusCircle } from "lucide-react";

const FacultyEdit = () => {
  const { allFacultyData } = useGlobalContext();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>("shift1");
  const changeFilter = (filt: string) => {
    setFilter(filt);
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
        title="Add Faculty"
      >
        <AddFacultyForm setIsAddDialogOpen={setIsAddDialogOpen} />
      </Dialog>
      <div>
        <select
          onChange={(e) => changeFilter(e.target.value)}
          className="p-4 px-6 bg-white border-[#ccc] border border-solid rounded-xl "
        >
          <option className="p-2" value="shift1">
            Shift 1
          </option>
          <option className="p-2" value="shift2">
            Shift 2
          </option>
          <option className="p-2" value="all">
            All
          </option>
        </select>
        <div className="flex flex-row gap-3 my-4">
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
          >
            <PlusCircle />
            <p className="font-semibold">Add New faculty</p>
          </button>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-12 gap-4 p-4">
        {allFacultyData
          ?.filter(
            (faculty) =>
              filter === "all" ||
              faculty.shift === filter ||
              faculty.shift === "both"
          )
          .map((faculty, index) => (
            <FacultyCard key={index} faculty={faculty} />
          ))}
      </div>
    </div>
  );
};

export default FacultyEdit;
