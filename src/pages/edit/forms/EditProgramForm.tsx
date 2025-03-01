import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import { ProgramType } from "../../../types/deptTypes";
import SubmitBtn from "../../../components/SubmitBtn";

interface errorType {
  title: string | null;
  programType: string | null;
  aboutProgram: string | null;
  totalSemesters: string | null;
}

interface props {
  programData: ProgramType;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProgramForm = ({ programData, setIsEditDialogOpen }: props) => {
  const { loggedInAdmin, notify, getAllProgramData, setIsLoading, baseUrl } =
    useGlobalContext();
  const [formData, setFormData] = useState({
    title: programData.title,
    programType: programData.programType,
    aboutProgram: programData.aboutProgram[0],
    totalSemesters: programData.totalSemesters,
  });

  const [errors, setErrors] = useState<errorType | null>(null);

  // Handle text input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors: errorType = {
      title: null,
      programType: null,
      aboutProgram: null,
      totalSemesters: null,
    };

    if (!formData.title) newErrors.title = "Program title is required";
    if (!formData.programType)
      newErrors.programType = "ProgramType is required";
    if (!formData.aboutProgram)
      newErrors.aboutProgram = "AboutaboutProgram is required";
    if (!formData.totalSemesters)
      newErrors.totalSemesters = "TototalSemesters is required";

    setErrors(newErrors);

    // Check if any error message is not null
    return Object.values(newErrors).every((val) => val === null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedFields: any = {};
    if (formData.title !== programData?.title)
      updatedFields.title = formData.title;
    if (formData.programType !== programData?.programType)
      updatedFields.programType = formData.programType;
    if (formData.aboutProgram !== programData?.aboutProgram[0])
      updatedFields.aboutProgram = formData.aboutProgram;
    if (+formData.totalSemesters !== programData?.totalSemesters)
      updatedFields.totalSemesters = formData.totalSemesters;

    // If no changes, return early
    if (Object.keys(updatedFields).length === 0) {
      notify("No changes detected", false);
      return;
    }

    const data = { ...updatedFields };

    try {
      setIsLoading(true);
      const response = await axios.put(
        baseUrl + `/api/programs/update-program/${programData?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notify(response.data.message, true);
        setIsEditDialogOpen(false);
        getAllProgramData();
      } else {
        notify("Failed to add program", false);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      notify(error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-2 bg-white rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700">program Name</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter Programe Title"
        />
        {errors?.title && <p className="error-text">{errors.title}</p>}
      </div>

      {/* Path Name */}
      <div className="mb-4">
        <label className="block text-gray-700">about Program</label>
        <textarea
          name="aboutProgram"
          value={formData.aboutProgram}
          onChange={handleChange}
          className="input-field"
          placeholder="Eg:Assistant professor"
        />
        {errors?.aboutProgram && (
          <p className="error-text">{errors.aboutProgram}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700">program type</label>
        <input
          type="text"
          name="programType"
          value={formData.programType}
          onChange={handleChange}
          className="input-field"
          placeholder="Under graduate, post Graduate, phd ect"
        />
        {errors?.programType && (
          <p className="error-text">{errors.programType}</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700">total of semesters</label>
          <input
            type="number"
            name="totalSemesters"
            value={formData.totalSemesters}
            onChange={handleChange}
            className="input-field"
            placeholder="total semestes"
          />
          {errors?.totalSemesters && (
            <p className="error-text">{errors.totalSemesters}</p>
          )}
        </div>
      </div>
      <SubmitBtn />
    </form>
  );
};

export default EditProgramForm;
