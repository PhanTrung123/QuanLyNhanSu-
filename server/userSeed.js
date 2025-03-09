import User from "./models/User.js"; // Đổi tên import để tuân theo quy ước PascalCase
import bcrypt from "bcrypt"; // bcrypt là một thư viện để mã hóa mật khẩu
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
  connectToDatabase(); // Kết nối với database
  try {
    const hashPassword = await bcrypt.hash("admin", 10); // Mã hóa mật khẩu
    // newUser là một đối tượng của User để tạo mới một user
    const newUser = new User({
      // Đổi tên đối tượng thành User
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin", // role: quyền của user
    });
    await newUser.save(); // Lưu user vào database
  } catch (error) {
    console.log(error); // Cải thiện thông báo lỗi
  }
};

userRegister();
