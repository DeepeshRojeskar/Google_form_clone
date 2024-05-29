import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import "./App.css";
import Home from "./Components/SubAdmin/Home";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Adminlogin from "./Components/Adminlogin/Adminlogin";
import Login from "./Components/Login/Login";
import ErrorPage from "./Components/errorpage/ErrorPage";
import toast, { Toaster } from "react-hot-toast";
import FormEditor from "./Components/FormEditor/FormEditor";
import Fill from "./Components/fillform/Fill";
import Submited from "./Components/fillform/Submited";
import { formProvider } from "./context/FormContextProvider";
function App() {
  const { admin, setAdmin, subadmin, setsubAdmin } = formProvider();
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      setAdmin(data);
      const subdata = JSON.parse(localStorage.getItem("subuser"));
      setsubAdmin(subdata);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={subadmin}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={admin}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminlogin"
          element={
            <ProtectedRoute user={!admin}>
              <Adminlogin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/formEdit/:formid"
          element={
            <ProtectedRoute user={subadmin || admin}>
              <FormEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute
              user={!(subadmin || admin)}
              redirect={admin ? "/admin" : "/"}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route path="/fill-form/:formid" element={<Fill />} />
        <Route path="/submited" element={<Submited />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
