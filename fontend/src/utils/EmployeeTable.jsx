import axios from "axios";

export const fetchDepartments = async () => {
  let departments;
  try {
    const res = await axios.get("http://localhost:8000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.success) {
      departments = res.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};
