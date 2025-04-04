import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer"; // Thư viện giúp xử lý việc tải lên (upload) file như hình ảnh, tài liệu,...
import path from "path";
import Employee from "../models/Employee.js";

// biến lưu trữ
const storage = multer.diskStorage({
  // destination: Xác định thư mục lưu trữ file
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  // Xác định tên file sau khi được lưu
  // ví dụ Nếu người dùng upload file image.png vào lúc 1711123456789, tên file sau khi lưu có thể là 1711123456789.png
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }); //Khởi tạo multer để xử lý upload file

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      date,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    console.log(req.body);

    //Kiểm tra xem email đã tồn tại chưa
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Người dùng đã tồn tại!" });
    }

    // Dùng bcrypt.hash() để mã hóa mật khẩu trước khi lưu vào database.
    const hashPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản người dùng
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
      department,
    });
    const savedUser = await newUser.save();

    // Tạo thông tin nhân viên
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      date,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();
    console.log("Department received:", department);
    return res
      .status(200)
      .json({ success: true, message: "Đã tạo thành công!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi thêm nhân viên!" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Lỗi máy chủ!" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi lấy dữ liệu!" });
  }
};

export { addEmployee, upload, getEmployees, getEmployee };
