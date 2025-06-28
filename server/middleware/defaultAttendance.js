import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    //  nếu không có dữ liệu điểm danh cho ngày hiện tại, thì sẽ tạo một bản ghi điểm danh mặc định.
    // chỉ Lấy ngày hôm nay dưới dạng "YYYY-MM-DD".
    const date = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({ date });

    if (!existingAttendance) {
      const employees = await Employee.find({});
      const attendance = employees.map((employee) => ({
        date,
        employeeId: employee._id,
        status: null, // Trạng thái điểm danh mặc định là null
      }));
      await Attendance.insertMany(attendance); // Thêm điểm danh mặc định cho tất cả nhân viên
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Không thể tải dữ liệu điểm danh." });
  }
};

export default defaultAttendance;
