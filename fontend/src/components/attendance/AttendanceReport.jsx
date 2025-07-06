import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limitPerDay, setLimitPerDay] = useState(10);
  const [skipPerDay, setSkipPerDay] = useState(0);
  const [dateSearch, setDateSearch] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      // hàm lấy dữ liệu báo cáo điểm danh,
      // URLSearchParams để tạo chuỗi truy vấn
      const query = new URLSearchParams({ limitPerDay, skipPerDay });

      if (dateSearch) {
        // nếu có ngày tìm kiếm thì thêm vào chuỗi truy vấn
        query.append("date", dateSearch);
      }
      const res = await axios.get(
        `http://localhost:8000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        if (skipPerDay == 0) {
          setReport(res.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...res.data.groupData,
          }));
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Bảng Báo Cáo Điểm Danh
      </h2>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Tìm Kiếm Ngày:
        </label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-600 mt-10">Vui lòng chờ...</div>
      ) : (
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mb-10 bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📅 Ngày: {new Date(date).toLocaleDateString("vi-VN")}
            </h3>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2 text-center">STT</th>
                    <th className="px-4 py-2 text-center">ID NV</th>
                    <th className="px-4 py-2 text-center">Tên Nhân Viên</th>
                    <th className="px-4 py-2 text-center">Phòng Ban</th>
                    <th className="px-4 py-2 text-center">Tình Trạng</th>
                    <th className="px-4 py-2 text-center">Lý Do</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((data, num) => (
                    <tr
                      key={data.employeeId}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-center">{num + 1}</td>
                      <td className="px-4 py-2 text-center">
                        {data.employeeId}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {data.employeeName}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {data.departmentName}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold  ${
                            data.status === "Có Mặt"
                              ? "bg-green-100 text-green-700"
                              : data.status === "Vắng"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {data.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-600 italic text-center">
                        {data.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;
