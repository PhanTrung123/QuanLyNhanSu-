import mongoose from "mongoose";

//Schema: định nghĩa cấu trúc của một bảng trong MongoDB
const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

// Dùng mongoose.model() để tạo model Department từ departmentSchema
const Department = mongoose.model("Department", departmentSchema);
export default Department;
