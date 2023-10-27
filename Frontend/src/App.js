import React, { useState } from "react";
import LoginPage from "./Pages/Auth/Login";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/Auth/Register";
import AdminLogin from "./Pages/Auth/AdminLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Request from "./Pages/LoanRequest.jsx/Request";
import CreateLoan from "./Pages/Loan/CreateLoan";
import AppliedLoan from "./Pages/Loan/AppliedLoan";
import Installments from "./Pages/Loan/Installments";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import Loading from "./Pages/Loading";

const App = () => {
  return (
    <div className="bg-white">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/request" element={<Request />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/applied-loan" element={<AppliedLoan />} />
        <Route path="/installments/:id" element={<Installments />} />
      </Routes>
    </div>
  );
};

export default App;
