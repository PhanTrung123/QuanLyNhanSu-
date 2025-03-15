import React from "react";
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
  return (
    <div className="p-6  ">
      <h3 className="font-bold  text-2xl  ">Tổng Quan Hệ Thống Nhân Sự</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers className="text-[#3496ea]" />}
          text="Tổng Số Nhân Viên"
          number={13}
          color="bg-[#cfe8fb]"
        />
        <SummaryCard
          icon={<FaBuilding className="text-[#fccc2a]" />}
          text="Tổng Số Phòng Ban"
          number={5}
          color="bg-[#fef2c5]"
        />
        <SummaryCard
          icon={<FaMoneyBill className="text-[#f97135]" />}
          text="Lương Hàng Tháng"
          number="5.000.000 VNĐ"
          color="bg-[#ffe1d1]"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Thông Tin Nghỉ Phép</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt className="text-[#3496ea]" />}
            text="Đã Nộp Đơn Xin Nghỉ"
            number={5}
            color="bg-[#cfe8fb]"
          />
          <SummaryCard
            icon={<FaCheckCircle className="text-[#76aa46]" />}
            text="Đã Được Duyệt"
            number={2}
            color="bg-[#C4EBA2]"
          />
          <SummaryCard
            icon={<FaHourglassHalf className="text-[#fccc2a]" />}
            text="Đang Chờ Duyệt"
            number={4}
            color="bg-[#fef2c5]"
          />
          <SummaryCard
            icon={<FaTimesCircle className="text-[#f97135]" />}
            text="Bị Từ Chối"
            number={1}
            color="bg-[#ffe1d1]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
