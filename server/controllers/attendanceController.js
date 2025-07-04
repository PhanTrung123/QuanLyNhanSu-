import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });
    res.status(200).json({
      success: true,
      attendances: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi lấy dữ liệu điểm danh!",
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true, upsert: true } // Tạo mới nếu không tìm thấy
    );
    res
      .status(200)
      .json({ success: true, attendance, message: "Cập nhật thành công!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi cập nhật điểm danh!",
    });
  }
};

export { getAttendance, updateAttendance };
