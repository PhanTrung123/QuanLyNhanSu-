import Attendance from "../models/Attendance.js";

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

export { getAttendance };
