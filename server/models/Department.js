import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

//Schema: định nghĩa cấu trúc của một bảng trong MongoDB
const departmentSchema = new mongoose.Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

// khi xóa một phòng ban, thì toàn bộ nhân viên trong phòng ban đó và các dữ liệu liên quan đến họ (ngày nghỉ và lương) cũng sẽ bị xóa theo một cách tự động.
departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const employeeIds = employees.map((employee) => employee._id);

      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: employeeIds } });
      await Salary.deleteMany({ employeeId: { $in: employeeIds } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Dùng mongoose.model() để tạo model Department từ departmentSchema
const Department = mongoose.model("Department", departmentSchema);
export default Department;
