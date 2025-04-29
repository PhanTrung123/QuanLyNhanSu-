import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [searchSalaries, setSearchSalaries] = useState(null);
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
        setSearchSalaries(res.data.salary);
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

  const filterSalaries = (e) => {
    const searchID = salaries.filter((item) =>
      item.employeeId.employeeId
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase())
    );
    setSearchSalaries(searchID);
  };

  return (
    <>
      {searchSalaries === null ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-5">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Bảng Lương Nhân Viên
          </h2>

          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Tìm ID nhân viên ..."
              className="border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={filterSalaries}
            />
          </div>

          {searchSalaries.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="w-full text-sm text-left text-gray-700 bg-white">
                <thead className="text-sm text-gray-800 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">STT</th>
                    <th className="px-6 py-3">ID Nhân Viên</th>
                    <th className="px-6 py-3">Lương Cơ Bản</th>
                    <th className="px-6 py-3">Phụ Cấp</th>
                    <th className="px-6 py-3">Khấu Trừ</th>
                    <th className="px-6 py-3">Tổng Cộng</th>
                    <th className="px-6 py-3">Ngày Trả</th>
                  </tr>
                </thead>
                <tbody>
                  {searchSalaries.map((salary, index) => (
                    <tr
                      key={salary._id}
                      className="hover:bg-gray-50 border-b transition duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        {salary.employeeId?.employeeId || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {salary.basicSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {salary.allowances.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {salary.deductions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {salary.netSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(salary.payDate).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6 text-lg">
              Không có dữ liệu phù hợp.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
