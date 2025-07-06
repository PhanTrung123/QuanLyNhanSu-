import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { ColsEmp, EmployeeBtns } from "../../utils/EmployeeTable";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [searchEmps, setSearchEmps] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          let seriNumber = 1;
          const data = res.data.employees.map((employee) => ({
            _id: employee._id,
            seriNumber: seriNumber++,
            department_name:
              employee.department?.department_name || "Chưa phân phòng",
            name: employee.userId?.name || "N/A",
            date: new Date(employee.date).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-300"
                src={`http://localhost:8000/${employee.userId?.profileImage}`}
                alt="avatar"
              />
            ),
            action: <EmployeeBtns Id={employee._id} />,
          }));

          setEmployees(data);
          setSearchEmps(data);
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

  const filterEmployees = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchValue)
    );
    setSearchEmps(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f2f1] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold ">Danh Sách Nhân Viên</h3>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin nhân viên của bạn một cách dễ dàng
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <input
            className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none w-72"
            type="text"
            placeholder="Tìm kiếm theo tên nhân viên..."
            onChange={filterEmployees}
          />
          <Link
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition duration-200"
            to="/admin-dashboard/add-employee"
          >
            Thêm Nhân Viên Mới
          </Link>
        </div>

        <div className="mt-4 shadow-lg rounded-lg overflow-hidden border">
          <DataTable
            columns={ColsEmp}
            data={searchEmps}
            highlightOnHover
            pagination
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
                  fontSize: "0.95rem",
                  minHeight: "60px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
