import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hàm xử lý sự kiện khi người dùng ấn nút đăng nhập, async gửi yêu cầu POST đến API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // gửi yêu cầu POST đến API để xác thực người dùng
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // tạo giao diện đăng nhập
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-500 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-itim text-3xl text-white">
        Hệ thống quản lý nhân sự
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>

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
            ></input>
          </div>
          <div className="mb-4 flex item-center">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Nhớ mật khẩu</span>
            </label>
            <label className="ml-auto underline">Quên mật khẩu?</label>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
