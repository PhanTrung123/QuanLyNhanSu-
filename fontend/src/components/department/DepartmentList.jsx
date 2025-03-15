import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Cols, DepartmentBtns } from "../../utils/DepartmentTable";
import axios from "axios";

// giao diện form hiển thị danh sách các phòng ban
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // lấy dữ liệu từ các phòng ban đã được thêm
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          let seriNumber = 1;
          const data = await res.data.departments.map((department) => ({
            _id: department._id,
            seriNumber: seriNumber++,
            department_name: department.department_name,
            action: <DepartmentBtns _id={department._id} />,
          }));
          setDepartments(data);
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
        <div>Vui lòng chờ ... </div>
      ) : (
        <div className="p-5">
          <div className="">
            <h3 className="text-2xl font-bold">Quản Lý Phòng Ban</h3>
          </div>
          <div className="flex justify-between items-center mt-4">
            <input
              className="px-4 py-1 border border-gray-500 rounded"
              type="text"
              placeholder="Tìm phòng ban: "
            />
            <Link
              className="px-4 py-1 bg-[#2a9a9b] rounded-xl text-white"
              to="/admin-dashboard/add-department"
            >
              Thêm Phòng Ban Mới
            </Link>
          </div>
          <div className="mt-4 shadow-lg rounded-lg overflow-hidden ">
            <DataTable
              columns={Cols}
              data={departments}
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
      )}
    </>
  );
};

export default DepartmentList;
