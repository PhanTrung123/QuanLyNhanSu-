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

  // tìm kiếm
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Danh Sách Đơn Xin Phép
        </h2>

        {/* Bộ lọc */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="🔍 Tìm theo tên hoặc loại phép..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("Pending")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg transition ${
                statusFilter === "Pending"
                  ? "bg-yellow-300 text-white"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              <FiClock /> Chờ Duyệt
            </button>
            <button
              onClick={() => setStatusFilter("Approved")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg transition ${
                statusFilter === "Approved"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              <FiCheckCircle /> Đã Duyệt
            </button>
            <button
              onClick={() => setStatusFilter("Rejected")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg transition ${
                statusFilter === "Rejected"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              <FiXCircle /> Từ Chối
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">
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
                  fontSize: "16px",
                  backgroundColor: "#f3f4f6",
                  color: "#111827",
                },
              },
              rows: {
                style: {
                  fontSize: "15px",
                  minHeight: "60px",
                  backgroundColor: "#fff",
                },
              },
              pagination: {
                style: {
                  borderTop: "1px solid #e5e7eb",
                  padding: "20px",
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
