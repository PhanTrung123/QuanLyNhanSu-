import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cols = [
  {
    name: "STT",
    selector: (row) => row.seriNumber,
    center: true,
    width: "20%",
  },
  {
    name: "Tên Phòng Ban",
    selector: (row) => row.department_name,
    sortable: true,
    width: "40%",
  },
  {
    name: "Hành Động",
    selector: (row) => row.action,
    center: true,
    width: "40%",
  },
];

// chức năng xóa 1 phòng ban bất kỳ trong danh sách
export const DepartmentBtns = ({ Id, onDelete }) => {
  const navigate = useNavigate();

  // chức năng xóa 1 phòng ban bất kỳ trong danh sách
  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xóa?");
    if (confirm) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          onDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert("Lỗi máy chủ khi xóa!");
        }
      }
    }
  };

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Chỉnh sửa
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        onClick={() => handleDelete(Id)}
      >
        Xóa
      </button>
    </div>
  );
};
