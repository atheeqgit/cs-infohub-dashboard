import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context";
import SubmitBtn from "../../components/SubmitBtn";
interface errorType {
  username: string | null;
  password: string | null;
  email: string | null;
}

interface props {
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAdminForm = ({ setIsAddDialogOpen }: props) => {
  const { loggedInAdmin, notify, getAllAdmins, setIsLoading, baseUrl } =
    useGlobalContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    faculty: false,
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
      username: null,
      password: null,
      email: null,
    };

    if (!formData.username) newErrors.username = "Admin username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.email) newErrors.email = "Aboutemail is required";

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
        baseUrl + `/auth/admin/register`,
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
        getAllAdmins();
      } else {
        setIsLoading(false);
        notify("Failed to add admin", false);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      notify(error.message, false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-2 bg-white rounded-lg "
    >
      <div className="mb-4">
        <label className="block text-gray-700">admin Name</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter Admin Username"
        />
        {errors?.username && <p className="error-text">{errors.username}</p>}
      </div>

      {/* Path Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Admin password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          placeholder="password"
        />
        {errors?.password && <p className="error-text">{errors.password}</p>}
      </div>

      {/* Students, Staff, Alumni Count */}
      <div className="mb-4">
        <label className="block text-gray-700">email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          placeholder="Admin2@gmail.com"
        />
        {errors?.email && <p className="error-text">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-gray-700">is admin afaculty</label>
        <select
          name="faculty"
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
      </div>
      <SubmitBtn />
    </form>
  );
};

export default AddAdminForm;
