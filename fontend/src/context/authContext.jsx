// -----xác thực thông tin đăng nhập----- //
import axios from "axios"; //Dùng để gửi yêu cầu HTTP đến server.
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const authContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   Server kiểm tra Token:
    Nếu đúng → Cho phép truy cập.
    Nếu sai hoặc hết hạn → Bắt đăng nhập lại.
 * 
 */
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/api/auth/check",
            {
              headers: {
                Authorization: `Bearer ${token} `, //gửi token trong header HTTP để xác thực người dùng khi gọi API
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user); // Nếu xác thực thành công, lưu user
          }
        } else {
          setUser(null); // Nếu không có token, xóa user
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null); // Nếu lỗi, xóa user
        }
      } finally {
        setLoading(false); // Dừng trạng thái loading sau khi kiểm tra xong
      }
    };
    checkUser();
  }, []);

  // login để lưu thông tin người dùng vào state
  const login = (user) => {
    setUser(user);
  };

  // logout để xóa thông tin người dùng khỏi state và localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    // tạo context để lưu trữ thông tin người dùng gồm: user, login, logout, loading
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

// truy cập thông tin người dùng từ context (userContext) để sử dụng
export const useAuth = () => useContext(userContext);
export default authContext;
