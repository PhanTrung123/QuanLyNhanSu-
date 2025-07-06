import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Cols, DepartmentBtns } from "../../utils/DepartmentTable";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);

  const onDelete = () => {
    fetchDepartments();
  };

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
        const data = res.data.departments.map((department) => ({
          _id: department._id,
          seriNumber: seriNumber++,
          department_name: department.department_name,
          action: <DepartmentBtns Id={department._id} onDelete={onDelete} />,
        }));
        setDepartments(data);
        setSearch(data);
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
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = departments.filter((department) =>
      department.department_name.toLowerCase().startsWith(searchValue)
    );
    setSearch(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f2f1] p-8">
      <div className="max-w-6xl mx-auto rounded-2xl  ">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center md:text-left">
            Quản Lý Phòng Ban
          </h3>

          <div className="flex flex-col md:flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="Tìm phòng ban..."
              onChange={filterDepartments}
              className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none w-64"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition duration-200"
            >
              Thêm Phòng Ban
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-10 text-lg">
            Vui lòng chờ...
          </div>
        ) : (
          <div className="mt-4 shadow-lg rounded-lg overflow-hidden border ">
            <DataTable
              columns={Cols}
              data={search}
              highlightOnHover
              pagination
              responsive
              customStyles={{
                headRow: {
                  style: {
                    fontWeight: "bold",
                    fontSize: "15px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    textTransform: "uppercase",
                  },
                },
                rows: {
                  style: {
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "center",
                    fontSize: ".95rem",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
