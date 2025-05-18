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

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.find({ employeeId: id });
    return res.status(200).json({
      success: true,
      leave,
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
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        select: "employeeId userId department",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "department_name" },
        ],
      })
      .exec();

    res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn xin phép:", error.message);
    res.status(500).json({
      success: false,
      error: "Lỗi máy chủ. Không thể lấy danh sách đơn xin phép.",
    });
  }
};

export { addLeave, getLeave, getLeaves };
