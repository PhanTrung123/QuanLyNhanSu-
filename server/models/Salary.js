import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      require: true,
    },
    basicSalary: {
      type: Number,
      require: true,
    },
    allowances: {
      type: Number,
    },
    deductions: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
    payDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;
