import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        if (res.data.success) {
          setEmployee(res.data.employee);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployees();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            📌 Thông Tin Nhân Viên
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Hình ảnh nhân viên */}
            <div className="flex justify-center">
              {employee?.userId?.profileImage ? (
                <img
                  src={`http://localhost:8000/${employee.userId.profileImage}`}
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <p className="text-gray-500 text-sm font-semibold">No Data</p>
              )}
            </div>

            {/* Thông tin nhân viên */}
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <p className="font-semibold min-w-36"> Họ Và Tên:</p>
                <p className="text-gray-900">
                  {employee?.userId?.name || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Mã Nhân Viên:</p>
                <p className="text-gray-900">
                  {employee?.employeeId || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Ngày Sinh:</p>
                <p className="text-gray-900">
                  {employee?.date
                    ? new Date(employee.date).toLocaleDateString()
                    : "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Giới Tính:</p>
                <p className="text-gray-900">{employee?.gender || "No Data"}</p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Tình Trạng:</p>
                <p className="text-gray-900">
                  {employee?.maritalStatus || "No Data"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Vui lòng chờ ...</div>
      )}
    </>
  );
};

export default Detail;
