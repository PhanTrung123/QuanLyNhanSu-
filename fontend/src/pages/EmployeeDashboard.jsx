import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex  min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 bg-[#ebeaea]">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
