import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    // lấy dữ liệu từ các phòng ban đã được thêm
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setDepartment(res.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-600 mt-10">Vui lòng chờ...</div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100 ">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg  mb-14 ">
            <h3 className="text-2xl font-bold mb-6">
              Chỉnh Sửa Thông Tin Phòng Ban
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-sm font-bold mb-6"
                  htmlFor="department_name"
                >
                  Tên Phòng Ban
                </label>
                <input
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  type="text"
                  placeholder="Nhập tên phòng ban"
                  name="department_name"
                  onChange={handleChange}
                  value={department.department_name}
                  required
                />
              </div>
              <div className="mt-3 ">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="desc"
                >
                  Mô Tả
                </label>
                <textarea
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="desc"
                  placeholder="Nhập nội dung ..."
                  onChange={handleChange}
                  value={department.desc}
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-7/12 mt-6 bg-[#2a9a9b] font-bold py-2 px-4 rounded-md text-white hover:bg-[#249092]"
              >
                Chỉnh sửa
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
