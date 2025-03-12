import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth(); // lấy thông tin người dùng từ context

  return <div>AdminDashboard {user.name}</div>;
};

export default AdminDashboard;
