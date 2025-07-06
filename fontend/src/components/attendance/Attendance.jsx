import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { ColsAtt, AttendanceBtns } from "../../utils/AttendanceTable";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [SearchAttendance, setSearchAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = () => {
    fetchAttendances();
  };

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.attendances);
        let seriNumber = 1;
        const data = await res.data.attendances.map((attendance) => ({
          employeeId: attendance.employeeId.employeeId,
          seriNumber: seriNumber++,
          department_name: attendance.employeeId.department.department_name,
          name: attendance.employeeId.userId.name,
          action: (
            <AttendanceBtns
              status={attendance.status}
              employeeId={attendance.employeeId.employeeId}
              statusOptions={statusOptions}
            />
          ),
        }));
        setAttendances(data);
        setSearchAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleSearch = (e) => {
    const search = attendances.filter((att) =>
      att.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSearchAttendance(search);
  };

  if (!SearchAttendance) {
    return <div>Không Có Dữ Liệu Chấm Công!</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Quản Lý Chấm Công</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          className="px-4 py-1 border border-gray-500 rounded"
          type="text"
          placeholder="Tìm nhân viên: "
          onChange={handleSearch}
        />
        <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          Bảng Chấm Công Nhân Viên - Ngày{" "}
          {new Date().toLocaleDateString("vi-VN")}
        </p>
        <Link
          className="px-4 py-1 bg-[#2a9a9b] rounded-xl text-white"
          to="/admin-dashboard/attendance-report"
        >
          Báo Cáo Điểm Danh
        </Link>
      </div>
      <div className="mt-4 shadow-lg rounded-lg overflow-hidden ">
        <DataTable
          columns={ColsAtt}
          data={SearchAttendance}
          highlightOnHover
          pagination
          customStyles={{
            headRow: {
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
                borderBottom: "1px solid #ddd",
                textAlign: "center",
                fontSize: ".9rem",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Attendance;
