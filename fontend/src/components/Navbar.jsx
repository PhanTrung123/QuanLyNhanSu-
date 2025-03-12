import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex items-center text-white justify-between h-12 bg-[#34495E]  px-5">
      <p>Chào mừng trở lại {user.name}</p>
      <button className="px-4 py-1 bg-[#2980B9] hover:bg-[#3498DB] text-white rounded-lg transition duration-300">
        Đăng nhập
      </button>
    </div>
  );
};

export default Navbar;
