import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      //nếu người dùng đang chọn ảnh từ một <input type="file" name="image" /> thì sẽ xử lý .
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // Nếu không phải input file img (input text, email, password, ...), thì cập nhật trạng thái bằng value
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Thêm Thông Tin Nhân Viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Họ Và Tên
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Nhập email"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              ID Nhân Viên
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Nhập ID"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Năm Sinh
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Giới Tính
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            >
              <option value="">--Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Tình Trạng Hôn Nhân
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            >
              <option value="">--Chọn tình trạng</option>
              <option value="single">Độc thân</option>
              <option value="married">Đã kết hôn</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Chức Vụ
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Nhập chức vụ"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Phòng Ban
            </label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
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

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Lương
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Nhập lương"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Vai Trò
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
            >
              <option value="" disabled>
                --Chọn vai trò
              </option>
              <option value="admin">Admin</option>
              <option value="employee">Nhân viên</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Ảnh Đại Diện
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-5/12 mt-6 bg-teal-600 text-white font-bold py-2 px-6 rounded-md hover:bg-teal-700 transition"
          >
            Thêm Nhân Viên
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
