import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    require: true,
  },
  status: {
    type: String,
    enum: ["Có Mặt", "Vắng Mặt", "Nghỉ Ốm", "Nghỉ Có Phép"],
    default: null,
  },
});

const attendance = mongoose.model("Attendance", attendanceSchema);
export default attendance;
