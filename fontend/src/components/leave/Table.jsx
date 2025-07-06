import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { LeaveBtns, leaveCols } from "../../utils/LeaveTable";
import axios from "axios";
import { FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let seriNumber = 1;
        const data = res.data.leaves.map((leave) => ({
          _id: leave._id,
          seriNumber: seriNumber++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId?.userId?.name,
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.department_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveBtns Id={leave._id} />,
        }));

        setLeaves(data);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải dữ liệu đơn xin phép.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      leave.status?.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Danh Sách Đơn Xin Phép
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc loại phép..."
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStatusFilter("Chờ Xét Duyệt")}
              className={`px-5 py-2 flex items-center gap-2 rounded-xl font-semibold transition shadow ${
                statusFilter === "Chờ Xét Duyệt"
                  ? "bg-yellow-400 text-white"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }`}
            >
              <FiClock /> Chờ Duyệt
            </button>

            <button
              onClick={() => setStatusFilter("Đã Duyệt")}
              className={`px-5 py-2 flex items-center gap-2 rounded-xl font-semibold transition shadow ${
                statusFilter === "Đã Duyệt"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              <FiCheckCircle /> Đã Duyệt
            </button>

            <button
              onClick={() => setStatusFilter("Từ Chối")}
              className={`px-5 py-2 flex items-center gap-2 rounded-xl font-semibold transition shadow ${
                statusFilter === "Từ Chối"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
            >
              <FiXCircle /> Từ Chối
            </button>

            <button
              onClick={() => setStatusFilter("All")}
              className={`px-5 py-2 flex items-center gap-2 rounded-xl font-semibold transition shadow ${
                statusFilter === "All"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Tất Cả
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-600 py-10 italic">
            Đang tải dữ liệu...
          </div>
        ) : (
          <DataTable
            columns={leaveCols}
            data={filteredLeaves}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  textTransform: "uppercase",
                },
              },
              rows: {
                style: {
                  fontSize: "14px",
                  minHeight: "60px",
                },
              },
              pagination: {
                style: {
                  borderTop: "1px solid #e5e7eb",
                  padding: "15px",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
