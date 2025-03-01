import React, { useState } from "react";
import { FacultyType } from "../../../types";
import { Dialog } from "./Dialog";
import EditFacultyForm from "../forms/EditFacultyForm";
import { Edit, Trash2 } from "lucide-react";
import { useGlobalContext } from "../../../context";
import axios from "axios";

interface FacultyCardProps {
  faculty: FacultyType;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const { baseUrl, notify, loggedInAdmin, getAllFacultyData } =
    useGlobalContext();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const deleteFaculty = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/faculty/delete-faculty/${faculty._id}`,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "multipart/form-data",
          },
        } // Add protocol
      );
      notify(response.data.message, true);
      setIsDeleteDialogOpen(false);
      getAllFacultyData();
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    } finally {
    }
  };

  return (
    <div className="group h-full col-span-12 md:col-span-6 lg:col-span-4 mt-32  relative flex flex-col items-center">
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
        }}
        title="Edit Faculty"
      >
        <EditFacultyForm
          facultyData={faculty}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
      </Dialog>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
        }}
        title="delete Faculty"
      >
        <div className="flex flex-row w-full gap-2">
          <button
            className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80  border hover:border-2 border-solid hover:shadow-lg transition-shadow w-full justify-center border-red-600 "
            onClick={() => {
              deleteFaculty();
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

      <div className="absolute top-[-25%] left-1/2 transform -translate-x-1/2 flex justify-center w-[160px] h-[160px]">
        <img
          className="border-4 w-full border-solid border-green-900 rounded-full object-cover"
          src={faculty.imgSrc?.url}
          alt=""
        />
      </div>

      <div className="bg-white border pt-20 border-solid border-[#ccc] rounded-xl flex-[0.7] flex flex-col w-full  px-4  gap-2 transition-all duration-300 group-hover:shadow-[7px_7px_0px_0px_rgba(170,17,23,1)]">
        <h1 className="small-text font-extrabold text-red-800 uppercase">
          {faculty.name}
        </h1>
        {/* <h3 className="text-lg font-bold text-[#166D00]">
                
              </h3> */}
        <div>
          <h3 className="text-md text-black/80 font-semibold capitalize">
            designation
          </h3>
          <p className="text-base text-black font-semibold mt-[-3px] ml-4">
            {faculty.designation}
          </p>
        </div>
        <div>
          <h3 className="text-md text-black/80 font-semibold capitalize">
            education
          </h3>
          <p className="text-base text-black font-semibold mt-[-3px] ml-4">
            {faculty.education}
          </p>
        </div>
        <div>
          <h3 className="text-md text-black/80 font-semibold capitalize">
            shift
          </h3>
          <p className="text-base text-black font-semibold mt-[-3px] ml-4">
            {faculty.shift}
          </p>
        </div>
        <div>
          <h3 className="text-md text-black/80 font-semibold capitalize">
            show on home
          </h3>
          <p className="text-base text-black font-semibold mt-[-3px] ml-4">
            {faculty.showOnHome ? "true" : "false"}
          </p>
        </div>
        {/* <p className="underline mt-auto text-red-800">Know more</p> */}
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
    </div>
  );
};

export default FacultyCard;
