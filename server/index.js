import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectToDatabase from "./db/db.js"; // Đảm bảo file này có chứa hàm kết nối

// Thiết lập thời gian chờ cho Mongoose
mongoose.set("socketTimeoutMS", 60000); // Tăng thời gian chờ socket lên 60 giây
mongoose.set("connectTimeoutMS", 60000); // Tăng thời gian chờ kết nối lên 60 giây

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
connectToDatabase();

const PORT = process.env.PORT || 5000; // Dự phòng nếu biến môi trường PORT không có
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
