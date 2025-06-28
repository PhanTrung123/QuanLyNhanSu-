import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBill,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:8000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg font-medium">
        Vui lòng chờ...
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#ebeaea] min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 border-b pb-4">
        Tổng Quan Hệ Thống Nhân Sự
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          icon={<FaUsers className="text-[#3496ea]" />}
          text="Tổng Số Nhân Viên"
          number={summary.totalEmployees}
          color="bg-[#e6f4fd]"
        />
        <SummaryCard
          icon={<FaBuilding className="text-[#fccc2a]" />}
          text="Tổng Số Phòng Ban"
          number={summary.totalDepartments}
          color="bg-[#fff6dc]"
        />
        <SummaryCard
          icon={<FaMoneyBill className="text-[#f97135]" />}
          text="Lương Hàng Tháng"
          number={`${summary.totalSalary.toLocaleString()} VNĐ`}
          color="bg-[#ffe8dc]"
        />
      </div>

      {/* THỐNG KÊ NGHỈ PHÉP */}
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8 border-b pb-2">
        Thông Tin Nghỉ Phép
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<FaFileAlt className="text-[#3496ea]" />}
          text="Đã Nộp Đơn"
          number={summary.leaveSummary.applied}
          color="bg-[#e6f4fd]"
        />
        <SummaryCard
          icon={<FaCheckCircle className="text-[#76aa46]" />}
          text="Đã Duyệt"
          number={summary.leaveSummary.approved}
          color="bg-[#e5f6d5]"
        />
        <SummaryCard
          icon={<FaHourglassHalf className="text-[#fccc2a]" />}
          text="Chờ Duyệt"
          number={summary.leaveSummary.pending}
          color="bg-[#fff6dc]"
        />
        <SummaryCard
          icon={<FaTimesCircle className="text-[#f97135]" />}
          text="Bị Từ Chối"
          number={summary.leaveSummary.rejected}
          color="bg-[#ffe8dc]"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
