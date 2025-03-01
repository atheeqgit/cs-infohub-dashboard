import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DepartmentType,
  FacultyType,
  EventType,
  AdminType,
  ProgramType,
} from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface GlobalContextType {
  departmentData: DepartmentType | null;
  setDepartmentData: React.Dispatch<
    React.SetStateAction<DepartmentType | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  baseUrl: string;
  allFacultyData: FacultyType[] | null;
  notify: (msg: string, success: boolean) => void;
  getAllFacultyData: () => void;
  getDepartmentData: () => void;
  getAllAdmins: () => void;
  getAllProgramData: () => void;
  // setAllAdminData: React.Dispatch<React.SetStateAction<AdminType[] | null>>
  allAdminData: AdminType[] | null;
  setAllFacultyData: React.Dispatch<React.SetStateAction<FacultyType[] | null>>;
  allEventsData: EventType[] | null;
  allProgramsData: ProgramType[] | null;
  setAllEventsData: React.Dispatch<React.SetStateAction<EventType[] | null>>;
  loggedInAdmin: AdminType | null;
  setLoggedInAdmin: React.Dispatch<React.SetStateAction<AdminType | null>>;
  editDeptData: { pathName: string; deptId: string } | null;
  setEditDeptData: React.Dispatch<
    React.SetStateAction<{ pathName: string; deptId: string } | null>
  >;
}

export const Context = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedInAdmin, setLoggedInAdmin] = useState<null | AdminType>(null);

  // for btns
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // {
  //   email: "seyedatheeqtest@gmail.com",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk2NmJiY2JmZjg3ZWIxYjhjN2UxMzYiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTc0MDA2NzYxMiwiZXhwIjoxNzQxMzYzNjEyfQ.40gFftK6gY4Xormy5LTv5PYk6gVuIRFCIWX_EKP5bLI",
  //   username: "seyed atheeq",
  // }
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api";

  const [allAdminData, setAllAdminData] = useState<null | AdminType[]>(null);
  const [departmentData, setDepartmentData] = useState<DepartmentType | null>(
    null
  );
  const [allFacultyData, setAllFacultyData] = useState<FacultyType[] | null>(
    null
  );
  const [allEventsData, setAllEventsData] = useState<EventType[] | null>(null);
  const [allProgramsData, setAllProgramsData] = useState<ProgramType[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const [editDeptData, setEditDeptData] = useState<{
    pathName: string;
    deptId: string;
  } | null>(null);

  useEffect(() => {
    if (localStorage.getItem("LSadmin")) {
      const LSadmin = JSON.parse(localStorage.getItem("LSadmin")!);
      setLoggedInAdmin(LSadmin);
    }
  }, []);

  useEffect(() => {
    if (editDeptData) {
      getDepartmentData();
      getAllFacultyData();
      getAllEventsData();
      getAllProgramData();
    }
  }, [editDeptData]);

  type NotifyFunction = (msg: string, success: boolean) => void;
  const notify: NotifyFunction = (msg, success) => {
    success ? toast.success(msg) : toast.error(msg);
  };

  const getAllAdmins = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${baseUrl}/auth/getAllAdmins`, // Add protocol
        {
          headers: {
            Authorization: `Bearer ${loggedInAdmin?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAllAdminData(response.data.data);
    } catch (err) {
      console.error("admin Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/department/home/${editDeptData?.pathName || ""}` // Add protocol
      );

      console.log(response.data);
      setDepartmentData({
        ...response.data.data.department,
        facultyData: response.data.data.facultyData,
        programsData: response.data.data.ProgramsData,
        eventsData: response.data.data.eventsData,
      });
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllFacultyData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/department/getAllData/${editDeptData?.deptId}/facultyData` // Add protocol
      );
      setAllFacultyData(response.data.facultyData);
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllEventsData = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/department/getAllData/${editDeptData?.deptId}/eventsData` // Add
      );
      setAllEventsData(response.data.eventsData);
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    } finally {
      setLoading(false);
    }
  };
  const getAllProgramData = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/department/getAllData/${editDeptData?.deptId}/programsData` // Add
      );
      setAllProgramsData(response.data.programsData);
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        getDepartmentData,
        isLoading,
        setIsLoading,
        openSideBar,
        setOpenSideBar,
        notify,
        getAllAdmins,
        allAdminData,
        allProgramsData,
        getAllProgramData,
        getAllFacultyData,
        loggedInAdmin,
        setLoggedInAdmin,
        baseUrl,
        departmentData,
        setDepartmentData,
        loading,
        setLoading,
        allFacultyData,
        setAllFacultyData,
        allEventsData,
        setAllEventsData,
        editDeptData,
        setEditDeptData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
