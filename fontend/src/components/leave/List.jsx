import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Danh Sách Đơn Xin Phép
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn xin phép..."
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg text-center hover:bg-blue-700 transition duration-200"
        >
          Thêm Đơn Xin Phép Mới
        </Link>
      </div>
    </div>
  );
};

export default List;
