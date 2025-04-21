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
          const data = await res.data.employees.map((employee) => ({
            _id: employee._id,
            seriNumber: seriNumber++,
            department_name: employee.department.department_name,
            name: employee.userId.name,
            date: new Date(employee.date).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                height={40}
                className="py-2"
                src={`http://localhost:8000/${employee.userId.profileImage}`}
              />
            ),
            action: <EmployeeBtns Id={employee._id} />,
          }));
          console.log(res.data);

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
    const searchEmps = employees.filter((employee) =>
      employee.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSearchEmps(searchEmps);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Thông Tin Nhân Viên</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          className="px-4 py-1 border border-gray-500 rounded"
          type="text"
          placeholder="Tìm nhân viên: "
          onChange={filterEmployees}
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
          columns={ColsEmp}
          data={searchEmps}
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
