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

const attendanceReport = async (req, res) => {
  try {
    //limitPerDay: số lượng bản ghi mỗi ngày, limitPerDay: số lượng bản ghi bỏ qua
    const { date, limitPerDay = 10, skipPerDay = 0 } = req.query;
    const query = {};

    if (date) {
      query.date = date;
    }

    const attendanceReport = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      })
      .sort({ date: -1 }) // Sắp xếp theo ngày giảm dần
      .limit(parseInt(limitPerDay))
      .skip(parseInt(skipPerDay));

    // sử dụng reduce để nhóm dữ liệu theo ngày
    const groupData = await attendanceReport.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.department_name,
        status: record.status || "Chưa Chấm Công",
        reason: record.reason || "Không có lý do",
      });
      return result;
    }, {});
    return res.status(201).json({
      success: true,
      groupData,
      message: "Lấy báo cáo thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi lấy báo cáo điểm danh!",
    });
  }
};

export { getAttendance, updateAttendance, attendanceReport };
