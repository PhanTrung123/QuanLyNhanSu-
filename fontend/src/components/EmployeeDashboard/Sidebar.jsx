import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaMoneyBill,
  FaTachometerAlt,
  FaUmbrella,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-[#1e2938] text-white fixed left-0 top-0 bottom-0 space-y-2 w-64 pt-4">
      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
          end
        >
          <FaTachometerAlt />
          <span>Bảng Điều Khiển</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaUser />
          <span>Thông Tin Cá Nhân </span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaUmbrella />
          <span>Nghỉ Phép</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/salary"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaMoneyBill />
          <span>Lương</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaCog />
          <span>Cài Đặt</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
