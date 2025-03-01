import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth/LoginPage";
import { useGlobalContext } from "./context";
import { Layout } from "./components/layouts/Layout";
import AllDepartments from "./pages/AllDepartments";
import EditLayout from "./components/layouts/EditLayout";
import LoadingScreen from "./components/LoadingScreen";
import DeptDetails from "./pages/edit/deptDetails";
import FacultyEdit from "./pages/edit/FacultyEdit";
import EventsEdit from "./pages/edit/EventsEdit";
import ProgramEdit from "./pages/edit/ProgramsEdit";
import AllAdmins from "./pages/AllAdmins";
function App() {
  const { loggedInAdmin } = useGlobalContext();
  return (
    <div className="w-full">
      <BrowserRouter>
        <ToastContainer />
        {loggedInAdmin ? (
          <Routes>
            <Route path="" element={<Layout />}>
              <Route index element={<Navigate to="/departments" replace />} />
              <Route
                path="departments"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <AllDepartments />
                  </React.Suspense>
                }
              />
              <Route
                path="admins"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <AllAdmins />
                  </React.Suspense>
                }
              />
            </Route>
            <Route path="/edit/:pathName/:deptID" element={<EditLayout />}>
              <Route
                index
                element={
                  <React.Suspense fallback={<LoadingScreen />}>
                    <DeptDetails />
                  </React.Suspense>
                }
                // element={<Navigate to="/department-details" replace />}
              />
              <Route
                path="/edit/:pathName/:deptID/faculty"
                element={<FacultyEdit />}
              />
              <Route
                path="/edit/:pathName/:deptID/events"
                element={<EventsEdit />}
              />
              <Route
                path="/edit/:pathName/:deptID/programs"
                element={<ProgramEdit />}
              />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="" element={<LoginPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
// <Route path="departments" element={
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <Departments />
//   </React.Suspense>
// } />
// <Route path="faculty" element={
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <Faculty />
//   </React.Suspense>
// } />
// <Route path="programs" element={
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <Programs />
//   </React.Suspense>
// } />
// <Route path="events" element={
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <Events />
//   </React.Suspense>
// } />
// <Route path="banners" element={
//   <React.Suspense fallback={<div>Loading...</div>}>
//     <Banners />
//   </React.Suspense>
// } />
