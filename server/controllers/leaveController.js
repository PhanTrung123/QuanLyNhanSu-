import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
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

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeeId: id });
    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      leaves = await Leave.find({ employeeId: employee._id });
    }
    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      select: "employeeId userId department",
      populate: [
        { path: "userId", select: "name" },
        { path: "department", select: "department_name" },
      ],
    });

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ. Không thể lấy danh sách đơn xin phép.",
    });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "employeeId userId department_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ. Không thể lấy thông tin." });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "Đơn xin phép không được tìm thấy." });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi cập nhật đơn." });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
