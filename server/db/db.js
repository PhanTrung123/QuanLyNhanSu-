// kết nối với database có thể sử dụng để kết nối với database MongoDB
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOB_URL);
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
