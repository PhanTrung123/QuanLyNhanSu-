import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    /**
     * Dùng aggregate để tính tổng lương của tất cả nhân viên trong bảng Employee.
     $group gom toàn bộ dữ liệu lại (_id: null) và tính tổng trường salary bằng $sum.
     Trả về là một mảng chứa một object có tổng lương (totalSalarys).
     */
    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalarys: { $sum: "$salary" } } },
    ]);

    // hiển thị số lượng nhân viên (các đơn xin nghỉ phép)
    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      applied: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Đã Duyệt")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Từ Chối")?.count || 0,
      pending:
        leaveStatus.find((item) => item._id === "Chờ Xét Duyệt")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalarys || 0,
      leaveSummary,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Không thể tải dữ liệu dashboard." });
  }
};

export { getSummary };
