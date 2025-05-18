import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { LeaveBtns, leaveCols } from "../../utils/LeaveTable";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let seriNumber = 1;
        const data = await res.data.leaves.map((leave) => ({
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
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Lỗi khi tải dữ liệu đơn xin phép.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {leaves ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Danh Sách Đơn Xin Phép
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm đơn xin phép..."
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition">
                  Chờ Xét Duyệt
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                  Đã Duyệt
                </button>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                  Từ Chối
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
                data={leaves}
                pagination
                highlightOnHover
                striped
                responsive
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#f9fafb",
                    },
                  },
                  rows: {
                    style: {
                      fontSize: "15px",
                      minHeight: "60px",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div>Vui lòng chờ ...</div>
      )}
    </>
  );
};

export default Table;
