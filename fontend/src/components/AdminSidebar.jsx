import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCog,
  FaMoneyBill,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

export const AdminSidebar = () => {
  return (
    <div className="bg-[#34495E] text-white fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="h-12 flex items-center justify-center bg-gradient-to-r bg-[ #1ABC9C] shadow-lg">
        <h3 className="text-3xl text-white font-bold font-itim drop-shadow-md">
          HRM Company
        </h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2980B9]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Bảng điều khiển</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded"
        >
          <FaUsers />
          <span>Nhân viên</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded"
        >
          <FaBuilding />
          <span>Phòng ban</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded"
        >
          <FaCalendar />
          <span>Nghỉ phép</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded"
        >
          <FaMoneyBill />
          <span>Lương</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded"
        >
          <FaCog />
          <span>Cài đặt</span>
        </NavLink>
      </div>
    </div>
  );
};
