import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        if (res.data.success) {
          setLeave(res.data.leave);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            📌 Danh Sách Các Đơn Nghỉ Phép
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Hình ảnh nhân viên */}
            <div className="flex justify-center">
              {leave?.employeeId?.userId?.profileImage ? (
                <img
                  src={`http://localhost:8000/${leave.employeeId.userId.profileImage}`}
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <p className="text-gray-500 text-sm font-semibold">No Data</p>
              )}
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <p className="font-semibold min-w-36"> Họ Và Tên:</p>
                <p className="text-gray-900">
                  {leave.employeeId.userId.name || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Mã Nhân Viên:</p>
                <p className="text-gray-900">
                  {leave?.employeeId?.employeeId || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Loại Nghỉ Phép:</p>
                <p className="text-gray-900">{leave?.leaveType || "No Data"}</p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Lý Do:</p>
                <p className="text-gray-900">{leave?.reason || "No Data"}</p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Phòng Ban:</p>
                <p className="text-gray-900">
                  {leave?.employeeId?.department?.department_name || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Từ Ngày:</p>
                <p className="text-gray-900">
                  {new Date(leave?.startDate).toLocaleDateString() || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Đến Ngày:</p>
                <p className="text-gray-900">
                  {new Date(leave?.endDate).toLocaleDateString() || "No Data"}
                </p>
              </div>

              <div className="flex items-center">
                <p className="font-semibold min-w-36">Tình Trạng:</p>
                <p className="text-gray-900">{leave?.status || "No Data"}</p>
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
