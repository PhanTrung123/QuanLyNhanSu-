import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();
    return res.status(200).json({
      success: true,
      message: "Cập nhật lương thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi cập nhật lương!",
    });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (role === "admin") {
      salary = await Salary.find({ employeeId: id }).populate(
        "employeeId",
        "employeeId"
      );
    } else {
      // Nếu không tìm thấy lương cho nhân viên, tìm kiếm theo employeeId
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }

    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi lấy thông tin lương!",
    });
  }
};
export { addSalary, getSalary };
