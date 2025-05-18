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
    <div className="bg-[#1e2938] text-white fixed left-0 top-0 bottom-0 space-y-2 w-64">
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
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
          end
        >
          <FaTachometerAlt />
          <span>Bảng Điều Khiển</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaUsers />
          <span>Nhân Viên</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaBuilding />
          <span>Phòng Ban</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#2a9294]" : " "
            } flex items-center space-x-4 block py-3 px-4 rounded-xl `
          }
        >
          <FaCalendar />
          <span>Nghỉ Phép</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
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
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-3 px-4 rounded-xl"
        >
          <FaCog />
          <span>Cài Đặt</span>
        </NavLink>
      </div>
    </div>
  );
};
