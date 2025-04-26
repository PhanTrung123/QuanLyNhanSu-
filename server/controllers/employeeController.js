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

// getEmployee: lấy thông tin nhân viên theo id
const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm Employee với _id == id OR userId == id
    const employee = await Employee.findOne({
      $or: [{ _id: id }, { userId: id }],
    })
      .populate("userId", { password: 0 })
      .populate("department");

    // Nếu không tìm thấy
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Không tìm thấy nhân viên" });
    }

    // Trả về dữ liệu
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi lấy dữ liệu!" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Không tìm thấy nhân viên!" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Không tìm thấy người dùng!" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        salary,
        department,
      }
    );
    if (!updateEmployee || !updatedUser) {
      return res
        .status(404)
        .json({ success: false, error: "Tài liệu không tồn tại!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Cập nhật thành công!", updateEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Lỗi máy chủ khi cập nhật nhân viên!",
    });
  }
};

// fetchEmployeeById: lấy danh sách nhân viên theo id phòng ban
const fetchEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi lấy dữ liệu!" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeeById,
};
