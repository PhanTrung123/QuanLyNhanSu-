// phần mềm trung gian kiểm tra token (mã xác thực)
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkUser = async (req, res, next) => {
  try {
    /**
        Lấy token từ Authorization trong header của request HTTP
        dùng .split(" ") để chia chuỗi thành mảng gồm 2 phần:
        Phần tử [0]: "Bearer"
        Phần tử [1]: token thực sự (cần lấy)
     */
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Thiếu token xác thực!" });
    }

    // decoded : phân tích và đọc nội dung của mã JWT trong .env
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res
        .status(404)
        .json({ success: false, error: "Token không hợp lệ!" });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Người dùng không tồn tại!" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ, vui lòng thử lại sau!" });
  }
};

export default checkUser;
