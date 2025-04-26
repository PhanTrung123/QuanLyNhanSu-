import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center bg-white shadow-md p-4 transition hover:shadow-lg w-11/12 mt-4 rounded-lg mx-auto ">
      <div className="bg-[#1abc9c] text-white rounded-full p-4 text-3xl flex items-center justify-center ">
        <FaUser />
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-lg font-bold">Chào mừng trở lại, </p>
        <p className="text-xl font-bold text-gray-800">{user.name}</p>
      </div>
    </div>
  );
};

export default Summary;
