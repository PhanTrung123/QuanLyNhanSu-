import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  let seriNumber = 1;

  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/leave/${id}/${user.id}`,
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
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 border border-gray-200">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Danh Sách Đơn Xin Phép
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo lý do hoặc loại phép..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          {user.role === "employee" && (
            <Link
              to="/employee-dashboard/add-leave"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-sm"
            >
              Thêm Đơn Mới
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 uppercase text-gray-700 text-xs">
            <tr className="uppercase text-xs text-gray-700 bg-gray-100">
              <th className="px-4 py-3 text-center font-bold">STT</th>
              <th className="px-4 py-3 text-center font-bold">LOẠI PHÉP</th>
              <th className="px-4 py-3 text-center font-bold">TỪ NGÀY</th>
              <th className="px-4 py-3 text-center font-bold">ĐẾN NGÀY</th>
              <th className="px-4 py-3 text-center font-bold">LÝ DO</th>
              <th className="px-4 py-3 text-center font-bold">TÌNH TRẠNG</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 border-b border-gray-100 text-center"
                >
                  <td className="px-4 py-3 font-semibold">{seriNumber++}</td>
                  <td className="px-4 py-3">{leave.leaveType || "Không rõ"}</td>
                  <td className="px-4 py-3">
                    {new Date(leave.startDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(leave.endDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    {leave.reason || "Không có lý do"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          leave.status === "Đã Duyệt"
                            ? "bg-green-200 text-green-700"
                            : leave.status === "Từ Chối"
                            ? "bg-red-200 text-red-700"
                            : "bg-yellow-200 text-yellow-700"
                        }`}
                    >
                      {leave.status || "Chờ Duyệt"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500 text-center">
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
