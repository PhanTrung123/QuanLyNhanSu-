import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [searchLeaves, setSearchLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data.leaves);
        setLeaves(res.data.leaves);
        setSearchLeaves(res.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Danh Sách Đơn Xin Phép
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn xin phép..."
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg text-center hover:bg-blue-700 transition duration-200"
        >
          Thêm Đơn Xin Phép Mới
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mt-6">
        <table className="w-full text-sm text-gray-700 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center">STT</th>
              <th className="px-4 py-3 text-center">Loại Nghỉ Phép</th>
              <th className="px-4 py-3 text-center">Từ Ngày</th>
              <th className="px-4 py-3 text-center">Đến Ngày</th>
              <th className="px-4 py-3 text-center">Mô Tả</th>
              <th className="px-4 py-3 text-center">Ngày Nộp Đơn</th>
              <th className="px-4 py-3 text-center">Tình Trạng</th>
            </tr>
          </thead>
          <tbody>
            {searchLeaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 border-b transition duration-150"
                >
                  <td className="px-4 py-2 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {leave.leaveType || "Không xác định"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(leave.startDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(leave.endDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 text-center">{leave.reason}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(leave.appliedDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {leave.status || "Chờ xử lý"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Không có đơn xin phép nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
