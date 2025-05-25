import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

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
        if (res.data.success) {
          setLeave(res.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            📌 Danh Sách Các Đơn Nghỉ Phép
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
                <p className="font-semibold min-w-36">
                  {leave.status === "Chờ Xét Duyệt"
                    ? "Hành Động: "
                    : "Tình Trang: "}
                </p>
                {leave.status === "Chờ Xét Duyệt" ? (
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg shadow transition duration-200"
                      onClick={() => changeStatus(leave._id, "Đã Duyệt")}
                    >
                      Duyệt
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg shadow transition duration-200"
                      onClick={() => changeStatus(leave._id, "Từ Chối")}
                    >
                      Từ Chối
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-900">{leave?.status || "No Data"}</p>
                )}
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
