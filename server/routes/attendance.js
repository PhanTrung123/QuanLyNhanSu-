import express from "express";
import {
  getAttendance,
  updateAttendance,
} from "../controllers/attendanceController.js";
import checkUser from "../middleware/authMiddlware.js";
import defaultAttendance from "../middleware/defaultAttendance.js";
import authMiddleware from "../middleware/authMiddlware.js";

const router = express.Router();

router.get("/", checkUser, defaultAttendance, getAttendance);
router.put("/update/:employeeId", authMiddleware, updateAttendance);

export default router;
