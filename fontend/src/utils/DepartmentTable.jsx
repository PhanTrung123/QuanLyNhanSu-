import { useNavigate } from "react-router-dom";

export const Cols = [
  {
    name: "STT",

    selector: (row) => row.seriNumber,
  },
  {
    name: "Tên Phòng Ban",
    selector: (row) => row.department_name,
  },
  {
    name: "Hành Động",
    selector: (row) => row.action,
  },
];

export const DepartmentBtns = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Chỉnh sửa
      </button>
      <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Xóa
      </button>
    </div>
  );
};
