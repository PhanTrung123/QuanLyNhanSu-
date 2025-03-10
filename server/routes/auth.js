import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddlware from "../middleware/authMiddlware.js";

const router = express.Router();

router.post("/login", login);
router.post("/check", authMiddlware, verify);
export default router;
