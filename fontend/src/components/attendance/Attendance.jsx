import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { ColsAtt, AttendanceBtns } from "../../utils/AttendanceTable";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [SearchAttendance, setSearchAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        let seriNumber = 1;
        const data = await res.data.attendances.map((attendance) => ({
          employeeId: attendance.employeeId.employeeId,
          seriNumber: seriNumber++,
          department_name: attendance.employeeId.department.department_name,
          name: attendance.employeeId.userId.name,
          action: <AttendanceBtns status={attendance.status} />,
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

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Thông Tin Nhân Viên</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          className="px-4 py-1 border border-gray-500 rounded"
          type="text"
          placeholder="Tìm nhân viên: "
          onChange={handleSearch}
        />
        <Link
          className="px-4 py-1 bg-[#2a9a9b] rounded-xl text-white"
          to="/admin-dashboard/add-employee"
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
                textAlign: "center",
                fontSize: "1.1rem",
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
