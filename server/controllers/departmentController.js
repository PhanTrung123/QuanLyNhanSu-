import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Lỗi máy chủ!" });
  }
};

// hàm bất đồng bộ (async) dùng để xử lý yêu cầu thêm phòng ban
const addDepartment = async (req, res) => {
  try {
    // Trích xuất dữ liệu từ req.body. Tạo đối tượng Department mới
    const { department_name, desc } = req.body;
    const newDepartment = new Department({
      department_name,
      desc,
    });
    await newDepartment.save(); // lưu dữ liệu

    // Phản hồi thành công
    return res.status(200).json({
      success: true,
      department: newDepartment,
      message: "Đã thêm thành công",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi thêm phòng ban!" });
  }
};
export { addDepartment, getDepartments };
