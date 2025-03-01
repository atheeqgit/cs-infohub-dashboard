import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import { FacultyType } from "../../../types/deptTypes";
import React from "react";
import SubmitBtn from "../../../components/SubmitBtn";

interface errorType {
  name: string | null;
  designation: string | null;
  education: string | null;
  shift: string | null;
  showOnHome: string | null;
}

interface props {
  facultyData: FacultyType;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFacultyForm = ({ facultyData, setIsEditDialogOpen }: props) => {
  const { loggedInAdmin, setIsLoading, notify, getAllFacultyData, baseUrl } =
    useGlobalContext();
  const [formData, setFormData] = useState({
    name: facultyData.name,
    designation: facultyData.designation,
    education: facultyData.education,
    pdfSrc: null,
    imgSrc: null,
    shift: facultyData.shift,
    showOnHome: facultyData.showOnHome,
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
      name: null,
      designation: null,
      education: null,
      shift: null,
      showOnHome: null,
    };

    if (!formData.name) newErrors.name = "Faculty name is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (!formData.shift) newErrors.shift = "Shift is required";

    setErrors(newErrors);

    // Check if any error message is not null
    return Object.values(newErrors).every((val) => val === null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedFields: any = {};
    if (formData.name !== facultyData?.name) updatedFields.name = formData.name;
    if (formData.education !== facultyData?.education)
      updatedFields.education = formData.education;
    if (formData.showOnHome !== facultyData?.showOnHome)
      updatedFields.showOnHome = formData.showOnHome;
    if (formData.shift !== facultyData?.shift)
      updatedFields.shift = formData.shift;
    if (formData.designation !== facultyData?.designation)
      updatedFields.designation = formData.designation;

    // If no changes, return early
    if (Object.keys(updatedFields).length === 0) {
      notify("No changes detected", false);
      return;
    }

    // Create FormData if any file exists
    let data: any;
    if (updatedFields.pdfSrc || updatedFields.imgSrc) {
      data = new FormData();
      Object.entries(updatedFields).forEach(([key, value]) => {
        data.append(key, value as any);
      });
    } else {
      data = updatedFields; // Send as JSON if no files
    }

    console.log(data);

    try {
      setIsLoading(true);
      const response = await axios.put(
        baseUrl + `/api/faculty/update-faculty/` + facultyData._id,
        data,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type":
              data instanceof FormData
                ? "multipart/form-data"
                : "application/json",
          },
        }
      );

      if (response.status === 200) {
        notify(response.data.message, true);
        notify(response.data.message, true);
        setIsEditDialogOpen(false);
        getAllFacultyData();
      } else {
        notify(response.data.message, false);
      }
    } catch (error: any) {
      notify(error.message, false);
      console.error("Error submitting form:", error);
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
          placeholder="Enter department name"
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
            defaultValue={facultyData.shift}
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
            defaultValue={facultyData.showOnHome}
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

export default EditFacultyForm;
