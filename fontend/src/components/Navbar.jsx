import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center text-white justify-between h-12 bg-[#2a9a9b] px-5">
      <p>Chào mừng trở lại ({user.name})</p>
      <button
        className="px-4 py-1 bg-[#2EAFB0] hover:bg-[#1ABC9C] text-white rounded-xl transition duration-300"
        onClick={logout}
      >
        Đăng Xuất
      </button>
    </div>
  );
};

export default Navbar;
