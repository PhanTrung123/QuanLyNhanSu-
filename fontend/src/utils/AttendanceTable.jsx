import React, { useState } from "react";

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
    name: "Hành Động",
    cell: (row) => <AttendanceBtns status={row.status} />,
    width: "450px",
    center: true,
  },
];

// Component nút chọn trạng thái chấm công
export const AttendanceBtns = ({ status: initialStatus }) => {
  const [status, setStatus] = useState(initialStatus || null);

  const handleStatusClick = (value) => {
    setStatus(value);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {status === null ? (
        <>
          <button
            onClick={() => handleStatusClick("Có Mặt")}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
          >
            Có Mặt
          </button>
          <button
            onClick={() => handleStatusClick("Vắng Mặt")}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
          >
            Vắng Mặt
          </button>
          <button
            onClick={() => handleStatusClick("Nghỉ Ốm")}
            className="bg-yellow-400 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500"
          >
            Nghỉ Ốm
          </button>
          <button
            onClick={() => handleStatusClick("Nghỉ Có Phép")}
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
