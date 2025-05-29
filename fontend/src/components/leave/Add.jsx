import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Yêu Cầu Đơn Xin Nghỉ Phép
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Loại Nghỉ Phép
          </label>
          <select
            name="leaveType"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="choose">--Chọn loại nghỉ phép--</option>
            <option value="Nghỉ Ốm">Nghỉ Ốm</option>
            <option value="Nghỉ Phép Năm">Nghỉ Phép Năm</option>
            <option value="Nghỉ Việc Riêng">Nghỉ Việc Riêng</option>
            <option value="Nghỉ Thai Sản">Nghỉ Thai Sản</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Từ Ngày:
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Đến Ngày:
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Ghi Chú
          </label>
          <textarea
            name="reason"
            placeholder="Lý Do Nghỉ..."
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Gửi Đơn
        </button>
      </form>
    </div>
  );
};

export default Add;
