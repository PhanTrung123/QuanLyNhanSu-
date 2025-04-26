import React from "react";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-[#0f766e] to-[#1abc9c] shadow-md text-white">
      {/* Logo & Company Name */}
      <div className="flex items-center space-x-4">
        <h3 className="text-2xl font-bold font-itim drop-shadow-sm">
          HRM Company
        </h3>
        <p className="text-lg font-medium hidden sm:block">
          | Chào mừng trở lại,{" "}
          <span className="font-semibold">{user.name}</span>
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 bg-[#155e75] hover:bg-[#0f766e] rounded-xl transition duration-300"
      >
        <FiLogOut className="text-lg" />
        <span className="font-medium">Đăng Xuất</span>
      </button>
    </div>
  );
};

export default Navbar;
