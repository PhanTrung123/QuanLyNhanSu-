import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ColsEmp = [
  {
    name: "STT",
    selector: (row) => row.seriNumber,
    width: "70px",
    center: true,
  },
  {
    name: "Tên NV",
    selector: (row) => row.name,
    sortable: true,
    width: "15%",
  },
  {
    name: "Ảnh",
    cell: (row) => row.profileImage,
    width: "120px",
    center: true,
  },
  {
    name: "Phòng Ban",
    selector: (row) => row.department_name,
    sortable: true,
    width: "15%",
  },
  {
    name: "Ngày Sinh",
    selector: (row) => row.date,
    sortable: true,
    width: "15%",
  },
  {
    name: "Hành Động",
    cell: (row) => row.action,
    width: "40%",
    center: true,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const res = await axios.get("http://localhost:8000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.success) {
      departments = res.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// các phòng ban từ form salary
export const getEmployees = async (id) => {
  let employees;
  try {
    const res = await axios.get(
      `http://localhost:8000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      employees = res.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeBtns = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        Xem
      </button>
      <button
        className="px-4 py-1 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Chỉnh sửa
      </button>
      <button
        className="px-4 py-1 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Lương
      </button>
      <button
        className="px-4 py-1 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Nghỉ Phép
      </button>
    </div>
  );
};
