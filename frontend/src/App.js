import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, ProtectedRoute, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Classes from "./pages/dashboard/Classes";
import Grades from "./pages/dashboard/Grades";
import Profile from "./pages/dashboard/Profile";
import Stats from "./pages/dashboard/Stats";
import Students from "./pages/dashboard/Students";
import AddStudent from "./pages/dashboard/AddStudent";
import SingleClass from "./pages/dashboard/SingleClass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="classes" element={<Classes />} />
          <Route path="students" element={<Students />} />
          <Route path="grades" element={<Grades />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addStudent" element={<AddStudent />} />
          <Route path="singleClass" index element={<SingleClass />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
