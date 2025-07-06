import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_name: "",
    desc: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f2f1] p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Thêm Phòng Ban Mới
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="department_name"
            >
              Tên Phòng Ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department_name"
              placeholder="Nhập tên phòng ban"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="desc"
            >
              Mô Tả
            </label>
            <textarea
              name="desc"
              rows="4"
              placeholder="Nhập mô tả phòng ban..."
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            Thêm Phòng Ban
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
