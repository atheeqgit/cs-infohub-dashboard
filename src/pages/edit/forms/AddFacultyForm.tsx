import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import SubmitBtn from "../../../components/SubmitBtn";

interface errorType {
  imgSrc: string | null;
  name: string | null;
  designation: string | null;
  education: string | null;
  pdfSrc: string | null;
  shift: string | null;
  showOnHome: string | null;
}

interface props {
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFacultyForm = ({ setIsAddDialogOpen }: props) => {
  const {
    loggedInAdmin,
    departmentData,
    notify,
    getAllFacultyData,
    setIsLoading,
    baseUrl,
  } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    education: "",
    pdfSrc: null,
    imgSrc: null,
    shift: "shift1",
    showOnHome: "false",
  });

  const [errors, setErrors] = useState<errorType | null>(null);
  const [previewImages, setPreviewImages] = useState<any>({});

  // Handle text input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection and preview
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev: any) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors: errorType = {
      imgSrc: null,
      name: null,
      designation: null,
      education: null,
      pdfSrc: null,
      shift: null,
      showOnHome: null,
    };

    if (!formData.name) newErrors.name = "Faculty name is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (!formData.shift) newErrors.shift = "Shift is required";
    if (!formData.imgSrc) newErrors.imgSrc = "Image is required";

    setErrors(newErrors);

    // Check if any error message is not null
    return Object.values(newErrors).every((val) => val === null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Call validateForm() properly
    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("education", formData.education);
    data.append("designation", formData.designation);
    data.append("shift", formData.shift);
    data.append("showOnHome", formData.showOnHome);
    if (formData.imgSrc) data.append("imgSrc", formData.imgSrc);
    if (formData.pdfSrc) data.append("pdfSrc", formData.pdfSrc);

    try {
      setIsLoading(true);
      const response = await axios.post(
        baseUrl + `/faculty/create-faculty/${departmentData?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        notify(response.data.message, true);
        setIsAddDialogOpen(false);
        getAllFacultyData();
      } else {
        setIsLoading(false);
        notify("Failed to add faculty", false);
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
        <label className="block text-gray-700">faculty Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter faculty name"
        />
        {errors?.name && <p className="error-text">{errors.name}</p>}
      </div>

      {/* Path Name */}
      <div className="mb-4">
        <label className="block text-gray-700">designation</label>
        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="input-field"
          placeholder="Eg:Assistant professor"
        />
        {errors?.designation && (
          <p className="error-text">{errors.designation}</p>
        )}
      </div>

      {/* Students, Staff, Alumni Count */}
      <div>
        <label className="block text-gray-700">education</label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="input-field"
          placeholder="m.phil,phd .. ect"
        />
        {errors?.education && <p className="error-text">{errors.education}</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700">shift</label>
          <select
            name="shift"
            onChange={handleChange}
            defaultValue="shift1"
            className="p-4 px-6 bg-white border-[#ccc] border border-solid rounded-xl "
          >
            <option className="p-2" value="shift1">
              Shift 1
            </option>
            <option className="p-2" value="shift2">
              Shift 2
            </option>
            <option className="p-2" value="both">
              both
            </option>
          </select>
          {errors?.shift && <p className="error-text">{errors.shift}</p>}
        </div>
        <div>
          <label className="block text-gray-700">show on home</label>
          <select
            name="showOnHome"
            onChange={handleChange}
            defaultValue="false"
            className="p-4 px-6 bg-white border-[#ccc] border border-solid rounded-xl "
          >
            <option className="p-2" value="false">
              false
            </option>
            <option className="p-2" value="true">
              true
            </option>
          </select>
          {errors?.showOnHome && (
            <p className="error-text">{errors.showOnHome}</p>
          )}
        </div>
      </div>
      {/* File Uploads */}
      {["imgSrc", "pdfSrc"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700">
            {field.replace("BG", " Background")}
          </label>
          <input
            type="file"
            name={field}
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImages[field] && (
            <img
              src={previewImages[field]!}
              className="mt-2 h-20 w-auto rounded-md"
            />
          )}
          {errors?.[field as keyof typeof errors] && (
            <p className="error-text">{errors[field as keyof typeof errors]}</p>
          )}
        </div>
      ))}
      {/* Submit Button */}
      <SubmitBtn />
    </form>
  );
};

export default AddFacultyForm;
