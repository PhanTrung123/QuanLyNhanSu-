import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // lấy thông tin người dùng từ context
  const navigate = useNavigate(); // dùng để chuyển hướng trang

  // sự kiện xử lý khi người dùng ấn nút đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    // nếu không có email hoặc password thì thông báo lỗi
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        // lưu token vào localStorage để xác thực người dùng
        localStorage.setItem("token", response.data.token);
        // nếu người dùng là admin thì chuyển hướng đến trang admin-dashboard và ngược lại chuyển hướng đến trang employee-dashboard
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
      }
    }
  };
  return (
    // tạo giao diện đăng nhập
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#2a3f54] from-1/2 to-gray-100 to-1/2 space-y-6">
      <h2 className="font-itim text-4xl text-white">
        Hệ thống quản lý nhân sự
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border text-gray-700 mt-1"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Pasword
            </label>
            <input
              type="password"
              className="block text-gray-700 w-full px-3 py-2 border mt-1"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-[#2a3f54] text-white mt-3 py-2 rounded w-full mb-4"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
