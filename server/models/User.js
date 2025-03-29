// note: đây là file model của user để tạo schema(userchema) và export ra ngoài
// note: schema là một cấu trúc dữ liệu của một đối tượng, nó mô tả cấu trúc của đối tượng
// bao gồm: tên, kiểu dữ liệu, ràng buộc dữ liệu, ...

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
// note: đây là file model của user để tạo schema(userchema) và export ra ngoài
