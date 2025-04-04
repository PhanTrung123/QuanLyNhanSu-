import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeTable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [employee, setEmployee] = useState(null);
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
      {departments && employee ? (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Cập Nhật Thông Tin Nhân Viên
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ và Tên */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Họ Và Tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.userId.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Tình Trạng Hôn Nhân */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Tình Trạng Hôn Nhân
                </label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">--Chọn tình trạng</option>
                  <option value="single">Độc thân</option>
                  <option value="married">Đã kết hôn</option>
                </select>
              </div>

              {/* Chức vụ */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Chức Vụ
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  placeholder="Nhập chức vụ"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              {/* Lương */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Lương
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Nhập lương"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Phòng Ban */}
              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2">
                  Phòng Ban
                </label>
                <select
                  name="department"
                  onChange={handleChange}
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
            </div>

            {/* Nút Cập Nhật */}
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

export default Edit;
