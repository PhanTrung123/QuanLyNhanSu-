// lấy dữ liệu từ react-router-dom để sử dụng bộ định tuyến
// và lấy dữ liệu từ các trang Login và AdminDashboard để hiển thị trên trình duyệt
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    // tạo bộ định tuyến cho trang web
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin-dashboard" element={<EmployeeDashboard />}></Route>
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
