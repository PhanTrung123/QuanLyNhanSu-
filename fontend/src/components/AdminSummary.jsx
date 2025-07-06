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
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(data);
      } catch (error) {
        if (error.response) alert(error.response.data.error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 animate-pulse text-lg">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10  pb-4">
          Tổng Quan Hệ Thống Nhân Sự
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <SummaryCard
            icon={<FaUsers className="text-blue-600 text-3xl" />}
            text="Tổng Nhân Viên"
            number={summary.totalEmployees}
            color="bg-blue-100"
          />
          <SummaryCard
            icon={<FaBuilding className="text-yellow-500 text-3xl" />}
            text="Phòng Ban"
            number={summary.totalDepartments}
            color="bg-yellow-100"
          />
          <SummaryCard
            icon={<FaMoneyBill className="text-orange-500 text-3xl" />}
            text="Tổng Lương Hằng Tháng (Nhân Viên) "
            number={summary.totalSalary.toLocaleString()}
            color="bg-orange-100"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Thống Kê Nghỉ Phép
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <SummaryCard
              icon={<FaFileAlt className="text-blue-600 text-3xl" />}
              text="Đã Nộp"
              number={summary.leaveSummary.applied}
              color="bg-blue-50"
            />
            <SummaryCard
              icon={<FaCheckCircle className="text-green-600 text-3xl" />}
              text="Đã Duyệt"
              number={summary.leaveSummary.approved}
              color="bg-green-50"
            />
            <SummaryCard
              icon={<FaHourglassHalf className="text-yellow-600 text-3xl" />}
              text="Chờ Duyệt"
              number={summary.leaveSummary.pending}
              color="bg-yellow-50"
            />
            <SummaryCard
              icon={<FaTimesCircle className="text-red-600 text-3xl" />}
              text="Bị Từ Chối"
              number={summary.leaveSummary.rejected}
              color="bg-red-50"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSummary;
