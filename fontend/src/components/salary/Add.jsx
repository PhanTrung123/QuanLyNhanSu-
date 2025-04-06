import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeTable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddSalary = () => {
  const [employees, setEmployees] = useState(null);
  const [departments, setDepartments] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        if (res.data.success) {
          setEmployee(res.data.employee);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleDEpartmentChange = async (e) => {
    const employees = await getEmployees(e.target.value);
    setEmployees(employees);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  //Hàm xử lý khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      //axios.post() để gửi yêu cầu POST đến địa chỉ localhoast
      const res = await axios.post(
        "http://localhost:8000/api/employee/add",
        formDataObj,
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
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && employees ? (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Thêm Lương Mới
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tên Phòng Ban */}
              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2">
                  Tên Phòng Ban
                </label>
                <select
                  name="department"
                  onChange={handleDEpartmentChange}
                  value={employee.department}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">--Chọn phòng ban</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tên Nhân Viên */}
              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2">
                  Tên Nhân Viên
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">--Chọn nhân viên</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.employeeId}
                    </option>
                  ))}
                </select>
              </div>

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

              {/*   Allowances: phụ cấp  */}
              <div>
                <label className="block font-medium text-gray-700 mb-2"></label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/*   Khoản khấu trừ  */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  khoản Khấu Trừ
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
