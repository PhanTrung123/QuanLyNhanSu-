import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, appliedDate, reason } =
      req.body;

    const newLeave = new Leave({
      employeeId: userId,
      leaveType,
      startDate,
      endDate,
      appliedDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({
      success: true,
      message: "Đơn xin nghỉ phép đã được gửi thành công",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id });
    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { addLeave, getLeaves };
