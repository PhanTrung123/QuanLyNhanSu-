import React from "react";
import { useAuth } from "../context/AuthContext";
import { AdminSidebar } from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import Summary from "../components/EmployeeDashboard/Summary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex  min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-[#ebeaea]">
        <Navbar />

        {/* Hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
