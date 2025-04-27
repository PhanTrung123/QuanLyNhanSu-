import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      require: true,
    },

    leaveType: {
      type: String,
      enum: ["Nghỉ Ốm", "Nghỉ Phép Năm", "Nghỉ Việc Riêng", "Nghỉ Thai Sản"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Chờ Xét Duyệt", "Đã Duyệt", "Từ Chối"],
      default: "Chờ Xét Duyệt",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
