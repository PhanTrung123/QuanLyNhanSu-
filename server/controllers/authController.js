import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// req, res: yêu cầu và phản hồi từ client
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "Người dùng không tồn tại!" });
    }

    // So sánh mật khẩu đã mã hóa coi có khớp với mật khẩu người dùng nhập vào không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, error: "Mật khẩu không chính xác!" });
    }

    // Tạo token: mã thông báo để xác thực người dùng
    const token = jwt.sign(
      { _id: user.id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // Trả về token và thông tin người dùng nếu đăng nhập thành công
    res.status(200).json({
      success: true,
      token,
      user: { _id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// xác minh
const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
export { login, verify };
