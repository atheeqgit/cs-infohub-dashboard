import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, ChevronRight, Plus } from "lucide-react";
import axios from "axios";
import { SrcType } from "../types";
import { useGlobalContext } from "../context";
import LoadingScreen from "../components/LoadingScreen";
import AddDepartmentForm from "./edit/forms/AddDepartmentForm";
import { Dialog } from "./edit/components/Dialog";

interface AllDeptType {
  _id: string;
  pathName: string;
  deptIcon: SrcType;
  deptName: string;
  about: string[];
}

const AllDepartments = () => {
  const { baseUrl, setLoading, loading } = useGlobalContext();

  const [departmentData, setDepartmentData] = useState<null | AllDeptType[]>(
    null
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllDepartments();
  }, []);

  const getAllDepartments = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${baseUrl}/department/getAllDept` // Add protocol
      );
      setDepartmentData(response.data.data);
    } catch (err) {
      console.error("department Request failed:", err);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="py-6">
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          // setSelectedDepartment(null);
        }}
        title="Add Department"
      >
        <AddDepartmentForm />
      </Dialog>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <p className="mt-2 text-sm text-gray-700">
          Browse through our academic departments and their programs
        </p>
        <div className="flex flex-row gap-3 my-4">
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="py-4 px-4 cursor-pointer  flex flex-row gap-2 rounded-xl bg-white hover:bg-white/80 border-transparent border hover:border-[#ececec] border-solid hover:shadow-lg transition-shadow"
          >
            <Plus />
            <p className="font-semibold">Add department</p>
          </button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departmentData?.map((department, index) => (
            <Link
              key={index}
              to={`/edit/${department.pathName}/${department._id}`}
              className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                    <Building2 className="h-6 w-6" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                    {department.deptName}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {department.about[0].slice(0, 20)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDepartments;
