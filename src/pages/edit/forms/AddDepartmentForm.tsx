import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import SubmitBtn from "../../../components/SubmitBtn";

interface errorType {
  deptName?: string | null;
  pathName?: string | null;
  studentsCount?: string | null;
  staffsCount?: string | null;
  alumniCount?: string | null;
  about: string | null;
  deptIcon: string | null;
  aboutBG: string | null;
  eventsBG: string | null;
  facultyBG: string | null;
}

const AddDepartmentForm = () => {
  const { loggedInAdmin, notify, setIsLoading, baseUrl } = useGlobalContext();
  const [formData, setFormData] = useState({
    pathName: "",
    deptName: "",
    snippetData: {
      studentsCount: "",
      staffsCount: "",
      alumniCount: "",
    },
    about: "",
    deptIcon: null,
    facultyBG: null,
    eventsBG: null,
    aboutBG: null,
  });

  const [errors, setErrors] = useState<errorType | null>(null);
  const [previewImages, setPreviewImages] = useState<any>({});

  // Handle text input changes,isLoading, setIsLoading
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name in formData.snippetData) {
      setFormData((prev) => ({
        ...prev,
        snippetData: { ...prev.snippetData, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  // Form validation
  const validateForm = () => {
    let newErrors: errorType = {
      deptName: null,
      pathName: null,
      studentsCount: null,
      staffsCount: null,
      alumniCount: null,
      about: null,
      deptIcon: null,
      aboutBG: null,
      eventsBG: null,
      facultyBG: null,
    };
    if (!formData.deptName) newErrors.deptName = "Department name is required";
    if (!formData.pathName) newErrors.pathName = "Path name is required";
    if (!formData.snippetData.studentsCount)
      newErrors.studentsCount = "Required";
    if (!formData.snippetData.staffsCount) newErrors.staffsCount = "Required";
    if (!formData.snippetData.alumniCount) newErrors.alumniCount = "Required";
    if (!formData.about) newErrors.about = "Required";
    if (!formData.deptIcon) newErrors.deptIcon = "Required";
    if (!formData.aboutBG) newErrors.aboutBG = "Required";
    if (!formData.eventsBG) newErrors.eventsBG = "Required";
    if (!formData.facultyBG) newErrors.facultyBG = "Required";

    setErrors(newErrors);

    return Object.values(newErrors).every((val) => val === null);
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Call validateForm(properly
    if (!validateForm()) return;
    console.log(formData);

    const data = new FormData();
    data.append("deptName", formData.deptName);
    data.append("pathName", formData.pathName);
    data.append("snippetData", JSON.stringify(formData.snippetData));
    data.append("about", JSON.stringify([formData.about]));
    if (formData.deptIcon) data.append("deptIcon", formData.deptIcon);
    if (formData.facultyBG) data.append("facultyBG", formData.facultyBG);
    if (formData.eventsBG) data.append("eventsBG", formData.eventsBG);
    if (formData.aboutBG) data.append("aboutBG", formData.aboutBG);

    try {
      setIsLoading(true);
      const response = await axios.post(
        baseUrl + "/department/create-department",
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
      className="max-w-lg mx-auto p-6 bg-white rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Department Name</label>
        <input
          name="deptName"
          value={formData.deptName}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter department name"
        />
        {errors?.deptName && <p className="error-text">{errors.deptName}</p>}
      </div>

      {/* Path Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Path Name</label>
        <input
          name="pathName"
          value={formData.pathName}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter path name"
        />
        {errors?.pathName && <p className="error-text">{errors.pathName}</p>}
      </div>

      {/* Students, Staff, Alumni Count */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700">Students</label>
          <input
            type="number"
            name="studentsCount"
            value={formData.snippetData.studentsCount}
            onChange={handleChange}
            className="input-field"
          />
          {errors?.studentsCount && (
            <p className="error-text">{errors.studentsCount}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Staffs</label>
          <input
            type="number"
            name="staffsCount"
            value={formData.snippetData.staffsCount}
            onChange={handleChange}
            className="input-field"
          />
          {errors?.staffsCount && (
            <p className="error-text">{errors.staffsCount}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Alumni</label>
          <input
            type="number"
            name="alumniCount"
            value={formData.snippetData.alumniCount}
            onChange={handleChange}
            className="input-field"
          />
          {errors?.alumniCount && (
            <p className="error-text">{errors.alumniCount}</p>
          )}
        </div>
      </div>

      {/* About */}
      <div className="mb-4">
        <label className="block text-gray-700">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter about section"
        />

        {errors?.about && <p className="error-text">{errors.about}</p>}
      </div>

      {/* File Uploads */}
      {["deptIcon", "facultyBG", "eventsBG", "aboutBG"].map((field) => (
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

export default AddDepartmentForm;
