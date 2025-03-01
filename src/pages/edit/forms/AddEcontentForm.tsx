import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context";
import { ProgramType } from "../../../types";
import SubmitBtn from "../../../components/SubmitBtn";

interface ErrorType {
  title: string | null;
  subjectName: string | null;
  subjectCode: string | null;
  semester: string | null;
  programName: string | null;
  files: string | null;
  academicYear: string | null;
  type: string | null;
}

interface param {
  programData: ProgramType;
}

const AddEcontentForm = ({ programData }: param) => {
  const { loggedInAdmin, notify, setIsLoading, baseUrl } = useGlobalContext();

  const [formData, setFormData] = useState({
    uploadedBy: loggedInAdmin?.username,
    title: "",
    subjectName: "",
    subjectCode: "",
    semester: null,
    programName: programData.title,
    programId: programData._id,
    metadata: {
      academicYear: "",
    },
    type: "",
    files: [] as File[],
  });
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name == "academicYear") {
      setFormData((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, academicYear: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 5) {
      setErrors((prev: any) => ({ ...prev, files: "Maximum 5 files allowed" }));
      return;
    }

    setFormData((prev) => ({ ...prev, files: [...files] }));
    setErrors((prev: any) => ({ ...prev, files: null }));

    // Generate preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(() => [...urls]);
  };

  const validateForm = () => {
    const newErrors: ErrorType = {
      title: null,
      subjectName: null,
      subjectCode: null,
      semester: null,
      programName: null,
      files: null,
      academicYear: null,
      type: null,
    };

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subjectName.trim())
      newErrors.subjectName = "Subject name is required";
    if (!formData.subjectCode.trim())
      newErrors.subjectCode = "Subject code is required";
    if (!formData.semester) newErrors.semester = "Semester is required";
    if (!formData.programName.trim())
      newErrors.programName = "Program name is required";
    if (!formData.type.trim()) newErrors.type = "type  is required";
    if (!formData.metadata.academicYear.trim())
      newErrors.academicYear = "Academic year is required";
    if (formData.files.length === 0)
      newErrors.files = "At least one file is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((val) => val === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formPayload = new FormData();

    formPayload.append("uploadedBy", formData.uploadedBy!);
    formPayload.append("title", formData.title);
    formPayload.append("subjectName", formData.subjectName);
    formPayload.append("subjectCode", formData.subjectCode);
    formPayload.append("semester", String(formData.semester));
    formPayload.append("programName", programData.title);
    formPayload.append("programId", programData._id);
    formPayload.append("type", formData.type);
    formData.files.forEach((file) => formPayload.append("files", file));
    formPayload.append(
      "metadata",
      JSON.stringify(formData.metadata.academicYear)
    );

    console.log(formPayload);
    try {
      setIsLoading(true);
      const response = await axios.post(
        baseUrl + "/eContent/create-eContent",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notify(response.data.message, true);
      // Reset form after successful submission
      // setFormData({
      //   uploadedBy: loggedInAdmin?.username,
      //   title: "",
      //   subjectName: "",
      //   subjectCode: "",
      //   semester: null,
      //   programName: programData.title,
      //   programId: programData._id,
      //   metadata: {
      //     academicYear: "",
      //   },
      //   type: "",
      //   files: [] as File[],
      // });
      // setPreviewUrls([]);
    } catch (error: any) {
      notify(error.response?.data?.message || "An error occurred", false);
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg"
    >
      {/* Text Inputs */}
      {["title", "subjectName", "subjectCode"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 capitalize">
            {field.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <input
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder={`Enter ${field
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()}`}
          />
          {errors?.[field as keyof ErrorType] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field as keyof ErrorType]}
            </p>
          )}
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">program</label>
        <input
          disabled
          value={formData.programName}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      {/* Academic Year and Type */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Academic Year</label>
          <input
            type="text"
            name="academicYear"
            value={formData.metadata.academicYear}
            onChange={handleChange}
            placeholder="eg: 2022 "
            className="w-full p-2 border rounded mt-1"
          />
          {errors?.academicYear && (
            <p className="text-red-500 text-sm mt-1">{errors.academicYear}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">e-content Reated type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">select</option>
            <option value="notes">Notes</option>
            <option value="exam">Exam</option>
            <option value="resource">Resource</option>
          </select>
          {errors?.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">select semester</label>
          <select
            name="semester"
            value={String(formData.semester)}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Semester</option>
            {Array.from({ length: programData.totalSemesters }, (_, i) => (
              <option
                key={i + 1}
                value={i + 1}
                disabled={i + 1 > 6} // Safety in case prop exceeds 6
              >
                Semester {i + 1}
              </option>
            ))}
          </select>
          {errors?.semester && (
            <p className="text-red-500 text-sm mt-1">{errors.semester}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Files (Max 5)</label>
        <input
          type="file"
          name="files"
          multiple
          onChange={handleFileChange}
          className="w-full mt-1"
          accept=".pdf,.doc,.docx,.jpg,.png"
        />
        {errors?.files && (
          <p className="text-red-500 text-sm mt-1">{errors.files}</p>
        )}

        {/* Preview Section */}
        <div className="mt-2 grid grid-cols-3 gap-2">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Preview"
              className="h-20 w-full object-cover rounded"
            />
          ))}
        </div>
      </div>

      <SubmitBtn />
    </form>
  );
};

export default AddEcontentForm;
