import { useNavigate } from "react-router-dom";

export const leaveCols = [
  {
    name: "STT",
    selector: (row) => row.seriNumber,
    width: "70px",
    center: true,
  },
  {
    name: "ID NV",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  { name: "Tên", selector: (row) => row.name, width: "140px" },
  { name: "Loại Nghỉ Phép", selector: (row) => row.leaveType, width: "160px" },
  { name: "Phòng Ban", selector: (row) => row.department, width: "170px" },
  {
    name: "Số Ngày Nghỉ",
    selector: (row) => row.days,
    width: "120px",
    center: true,
  },
  { name: "Tình Trạng", selector: (row) => row.status, width: "150px" },
  { name: "Hành Động", selector: (row) => row.action, center: true },
];

export const LeaveBtns = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leave/${id}`);
  };
  return (
    <button
      className="px-3 py-1 flex items-center gap-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
      onClick={() => handleView(Id)}
    >
      Xem
    </button>
  );
};
