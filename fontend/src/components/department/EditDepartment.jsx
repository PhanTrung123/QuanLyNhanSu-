import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  useEffect(() => {
    // lấy dữ liệu từ các phòng ban đã được thêm
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setDepartment(res.data.department);
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
    
  );
};

export default EditDepartment;
