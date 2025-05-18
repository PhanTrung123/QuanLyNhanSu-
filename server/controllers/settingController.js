import User from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy người dùng!",
      });
    }

    // kiểm tra mật khẩu cũ
    const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!oldPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: "Mật khẩu hiện tại không đúng!",
      });
    }

    // mã hóa và cập nhật mật khẩu mới
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashPassword });

    return res.status(200).json({
      success: true,
      message: "Thay đổi mật khẩu thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi thay đổi mật khẩu!",
    });
  }
};

export { changePassword };
