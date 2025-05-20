import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  let seriNumber = 1;

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
        setLeaves(res.data.leaves);
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

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.reason?.toLowerCase().includes(search.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
      {/* Tiêu đề */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Danh Sách Đơn Xin Phép
        </h1>
      </div>

      {/* Thanh tìm kiếm và nút thêm */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Tìm kiếm theo lý do hoặc loại phép..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-300 shadow"
        >
          Thêm Đơn Mới
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm text-gray-800 uppercase bg-blue-50">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Loại Phép</th>
              <th className="px-6 py-3">Từ Ngày</th>
              <th className="px-6 py-3">Đến Ngày</th>
              <th className="px-6 py-3">Lý Do</th>
              <th className="px-6 py-3">Tình Trạng</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 border-b border-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{seriNumber++}</td>
                  <td className="px-6 py-4">{leave.leaveType || "Không rõ"}</td>
                  <td className="px-6 py-4">
                    {new Date(leave.startDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(leave.endDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">{leave.reason || "Không rõ"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${
                          leave.status === "Đã Duyệt"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Từ Chối"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Không tìm thấy đơn xin phép nào.
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
