import axios from "axios";
import React from "react";

// Cột cho bảng chấm công
export const ColsAtt = [
  {
    name: "STT",
    selector: (row) => row.seriNumber,
    width: "100px",
    center: true,
  },
  {
    name: "Tên Nhân Viên",
    selector: (row) => row.name,
    sortable: true,
    width: "250px",
  },
  {
    name: "ID NV",
    selector: (row) => row.employeeId,
    width: "150px",
  },
  {
    name: "Phòng Ban",
    selector: (row) => row.department_name,
    sortable: true,
    width: "220px",
  },
  {
    name: "Tình Trạng",
    selector: (row) => row.action,
    width: "450px",
    center: true,
  },
];

export const AttendanceBtns = ({ status, employeeId, statusOptions }) => {
  // chọn trạng thái chấm công khi nhấn nút
  const clickMarkEmp = async (status, employeeId) => {
    const res = await axios.put(
      `http://localhost:8000/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      statusOptions(); // Cập nhật lại danh sách chấm công sau khi thay đổi trạng thái
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {status === null ? (
        <>
          <button
            onClick={() => clickMarkEmp("Có Mặt", employeeId)}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
          >
            Có Mặt
          </button>
          <button
            onClick={() => clickMarkEmp("Vắng Mặt", employeeId)}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
          >
            Vắng Mặt
          </button>
          <button
            onClick={() => clickMarkEmp("Nghỉ Ốm", employeeId)}
            className="bg-yellow-400 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500"
          >
            Nghỉ Ốm
          </button>
          <button
            onClick={() => clickMarkEmp("Nghỉ Có Phép", employeeId)}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            Nghỉ Phép
          </button>
        </>
      ) : (
        <span className="text-sm font-medium text-indigo-600">{status}</span>
      )}
    </div>
  );
};

export default AttendanceBtns;
