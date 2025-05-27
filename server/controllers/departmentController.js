import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Lỗi máy chủ !" });
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

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi lấy dữ liệu!" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name, desc } = req.body;
    const updateDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      {
        department_name,
        desc,
      }
    );
    return res.status(200).json({
      success: true,
      updateDepartment,
      message: "Cập nhật thông tin thành công!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi cập nhật!" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findById({ _id: id });
    await deleteDep.deleteOne();
    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lỗi máy chủ khi xóa" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
