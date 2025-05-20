import express from "express";
import authMiddleware from "../middleware/authMiddlware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeave);
router.get("/", authMiddleware, getLeaves);
router.get("/detail/:id", authMiddleware, getLeaveDetail);

export default router;
