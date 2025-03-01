import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import SubmitBtn from "../../../components/SubmitBtn";

interface errorType {
  title: string | null;
  programType: string | null;
  aboutProgram: string | null;
  totalSemesters: string | null;
}

interface props {
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProgramForm = ({ setIsAddDialogOpen }: props) => {
  const {
    loggedInAdmin,
    departmentData,
    notify,
    getAllProgramData,
    setIsLoading,
    baseUrl,
  } = useGlobalContext();
  const [formData, setFormData] = useState({
    title: "",
    programType: "",
    aboutProgram: "",
    totalSemesters: "",
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
      newErrors.programType = "Program Type is required";
    if (!formData.aboutProgram)
      newErrors.aboutProgram = "About Program is required";
    if (!formData.totalSemesters)
      newErrors.totalSemesters = "Total Semesters is required";

    setErrors(newErrors);

    // Check if any error message is not null
    return Object.values(newErrors).every((val) => val === null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = { ...formData };

    try {
      setIsLoading(true);
      const response = await axios.post(
        baseUrl + `/programs/create-program/${departmentData?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        notify(response.data.message, true);
        setIsAddDialogOpen(false);
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
        <label className="block text-gray-700">Program Type</label>
        <input
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

      {/* Students, Staff, Alumni Count */}
      <div>
        <label className="block text-gray-700">aboutProgram</label>
        <textarea
          name="aboutProgram"
          value={formData.aboutProgram}
          onChange={handleChange}
          className="input-field"
          placeholder="About this program"
        />
        {errors?.aboutProgram && (
          <p className="error-text">{errors.aboutProgram}</p>
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

export default AddProgramForm;
