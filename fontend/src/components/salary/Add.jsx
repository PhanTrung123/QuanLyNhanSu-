import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDEpartmentChange = async (e) => {
    const employees = await getEmployees(e.target.value);
    setEmployees(employees);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  //Hàm xử lý khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //axios.post() để gửi yêu cầu POST đến địa chỉ localhoast
      const res = await axios.post(
        `http://localhost:8000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //Nếu res.data.success là true, điều hướng đến trang danh sách nhân viên (navigate("/admin-dashboard/employees"))
      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Thêm Lương Mới
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tên Phòng Ban */}
              <div>
                <label className="block font-medium text-gray-700 mb-2  ">
                  Tên Phòng Ban
                </label>
                <select
                  name="department"
                  onChange={handleDEpartmentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">--Chọn phòng ban--</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ID Nhân Viên */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  ID Nhân Viên
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">--Chọn nhân viên--</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lương Cơ Bản */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Lương Cơ Bản
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Nhập lương cơ bản"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Phụ Cấp */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Phụ Cấp
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Nhập phụ cấp"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Khoản Khấu Trừ */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Khoản Khấu Trừ
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Nhập khoản khấu trừ"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Ngày Trả Lương */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Ngày Trả Lương
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-1/2 bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md"
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">Vui lòng chờ...</div>
      )}
    </>
  );
};

export default AddSalary;
