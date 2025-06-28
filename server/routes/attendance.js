import express from "express";
import { getAttendance } from "../controllers/attendanceController.js";
import checkUser from "../middleware/authMiddlware.js";
import defaultAttendance from "../middleware/defaultAttendance.js";

const router = express.Router();

router.get("/", checkUser, defaultAttendance, getAttendance);

export default router;
