import React from "react";
import { useAuth } from "../context/AuthContext";
import { AdminSidebar } from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import AdminSummary from "../components/AdminSummary";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 ">
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  );
};

export default AdminDashboard;
