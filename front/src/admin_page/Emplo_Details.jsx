import React, { useEffect, useState } from "react";
import { getAllemplo, delempl } from "../API'S_&_Protection/API";
import { useNavigate } from "react-router-dom";
import "./enploy.css";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const nav=useNavigate();
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getAllemplo();
      setEmployees(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await delempl(id);
      setEmployees(employees.filter(emp => emp.eid !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const logout=()=>{
    localStorage.removeItem("token");
    toast.success("Loged out");
    nav("/");
  }
  const addempl=()=>{
    nav("/addempl");
  }
  return (
    <div className="table-container">
      <button className="addempl" onClick={addempl}>ADDEMPL</button>
      <button className="Logout" onClick={logout}>Logout</button>
      <h2>Employee List</h2>

      <table className="emp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Phone_NO</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              
              <td>
                <img
                  src={`${emp.imgUrl}`}
                  alt="emp"
                  className="emp-img"
                />
              </td>
              <td>{emp.phoneNumber}</td>
              <td>{emp.address}</td>
              <td>
                <button onClick={() => handleUpdate(emp.eid)} className="update-btn">
                  Update
                </button>

                <button onClick={() => handleDelete(emp.eid)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;