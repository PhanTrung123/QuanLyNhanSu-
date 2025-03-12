// -----xác thực thông tin đăng nhập----- //
import axios from "axios"; //Dùng để gửi yêu cầu HTTP đến server.
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   Server kiểm tra Token:
    Nếu đúng → Cho phép truy cập.
    Nếu sai hoặc hết hạn → Bắt đăng nhập lại.
 * 
 */
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [localStorage.getItem("token")]);

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
export default AuthContext;
