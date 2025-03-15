import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ---chức năng thêm các phòng ban mới--- //
// setDepartment được sử dụng để cập nhật trạng thái khi có thay đổi.
const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_name: "",
    desc: "",
  });
  const navigate = useNavigate();

  //Hàm xử lý khi nhập dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  //Hàm xử lý khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //axios.post() để gửi yêu cầu POST đến địa chỉ localhoast
      const res = await axios.post(
        "http://localhost:8000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //Nếu res.data.success là true, điều hướng đến trang danh sách phòng ban (navigate("/admin-dashboard/departments"))
      if (res.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg  mb-14 ">
        <h3 className="text-2xl font-bold mb-6">Thêm Phòng Ban</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-bold mb-6" htmlFor="department_name">
              Tên Phòng Ban
            </label>
            <input
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Nhập tên phòng ban"
              name="department_name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3 ">
            <label
              className="block text-sm font-bold text-gray-700"
              htmlFor="desc"
            >
              Mô Tả
            </label>
            <textarea
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              name="desc"
              placeholder="Nhập nội dung ..."
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-7/12 mt-6 bg-[#2a9a9b] font-bold py-2 px-4 rounded-md text-white hover:bg-[#249092]"
          >
            Thêm Phòng Ban
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
