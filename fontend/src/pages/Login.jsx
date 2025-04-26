import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock } from "react-icons/fi"; // icon mail, lock

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
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
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6"
      style={{
        background: "linear-gradient(to right, #17837c, #22b2a7)", // gradient xanh ngọc như hình bạn gửi
      }}
    >
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-white font-itim text-center drop-shadow-lg">
        Hệ thống quản lý nhân sự
      </h1>

      {/* Form login */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-teal-400">
              <input
                type="email"
                id="email"
                className="w-full outline-none"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FiMail className="text-gray-400 mr-2" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-teal-400">
              <input
                type="password"
                id="password"
                className="w-full outline-none"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FiLock className="text-gray-400 mr-2" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
