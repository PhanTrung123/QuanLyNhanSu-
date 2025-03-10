import React from "react";
import { useAuth } from "../context/authContext";

const AdminDashboard = () => {
  const { user } = useAuth(); // lấy thông tin người dùng từ context

  return <div>AdminDashboard {user.name}</div>;
};

export default AdminDashboard;
