import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Thông Tin Nhân Viên</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          className="px-4 py-1 border border-gray-500 rounded"
          type="text"
          placeholder="Tìm phòng ban: "
        />
        <Link
          className="px-4 py-1 bg-[#2a9a9b] rounded-xl text-white"
          to="/admin-dashboard/add-employee"
        >
          Thêm Nhân Viên Mới
        </Link>
      </div>
      <div className="mt-4 shadow-lg rounded-lg overflow-hidden ">
        <DataTable
          //   columns={Cols}
          //   data={search}
          highlightOnHover
          pagination
          customStyles={{
            headRow: {
              style: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1rem",
              },
            },
            rows: {
              style: {
                borderBottom: "1px solid #ddd",
                textAlign: "center",
                fontSize: ".9rem",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
