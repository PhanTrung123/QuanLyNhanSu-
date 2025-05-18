import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SalaryHistory = () => {
  const [salaries, setSalaries] = useState(null);
  const { id } = useParams();

  const fetchSalaries = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setSalaries(res.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <>
      {salaries === null ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center  mb-6">
            Lịch Sử Lương Cá Nhân
          </h2>

          {salaries.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
              <table className="w-full text-sm text-gray-700 bg-white">
                <thead className="text-sm text-white uppercase bg-teal-600">
                  <tr>
                    <th className="px-5 py-3">STT</th>
                    <th className="px-5 py-3">Lương Cơ Bản</th>
                    <th className="px-5 py-3">Phụ Cấp</th>
                    <th className="px-5 py-3">Khấu Trừ</th>
                    <th className="px-5 py-3">Tổng Cộng</th>
                    <th className="px-5 py-3">Ngày Trả</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary, index) => (
                    <tr
                      key={salary._id}
                      className="hover:bg-gray-50 border-b transition duration-200"
                    >
                      <td className="px-5 py-4 text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {salary.basicSalary.toLocaleString()} ₫
                      </td>
                      <td className="px-5 py-4 text-center">
                        {salary.allowances.toLocaleString()} ₫
                      </td>
                      <td className="px-5 py-4 text-center">
                        {salary.deductions.toLocaleString()} ₫
                      </td>
                      <td className="px-5 py-4 text-center font-semibold text-green-600">
                        {salary.netSalary.toLocaleString()} ₫
                      </td>
                      <td className="px-5 py-4 text-center">
                        {new Date(salary.payDate).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6 text-lg">
              Không có dữ liệu lương để hiển thị.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SalaryHistory;
