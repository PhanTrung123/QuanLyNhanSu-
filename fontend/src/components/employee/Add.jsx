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
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Thêm Thông Tin Nhân Viên
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
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* ID Nhân Viên */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              ID Nhân Viên
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Nhập ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Năm Sinh */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Năm Sinh
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Giới Tính */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Giới Tính
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">--Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Tình Trạng Hôn Nhân */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tình Trạng Hôn Nhân
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">--Chọn tình trạng</option>
              <option value="single">Độc thân</option>
              <option value="married">Đã kết hôn</option>
            </select>
          </div>

          {/* Chức Vụ */}
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

          {/* Phòng Ban */}
          <div>
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

          {/* Lương */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Lương
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Nhập lương"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Mật Khẩu */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Vai Trò */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Vai Trò
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="" disabled>
                --Chọn vai trò
              </option>
              {/* <option value="admin">Admin</option> */}
              <option value="employee">Nhân viên</option>
            </select>
          </div>

          {/* Ảnh Đại Diện */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ảnh Đại Diện
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Nút Thêm Nhân Viên */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-1/2 bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md"
          >
            Thêm Nhân Viên
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
