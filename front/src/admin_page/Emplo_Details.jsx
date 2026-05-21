import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeTable = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:9091/employee/getempls"
      );

      console.log(res.data);

      setEmployees(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load employees");

    } finally {

      setLoading(false);

    }
  };

  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `http://localhost:9091/employee/delete/${id}`
      );

      toast.success("Employee Deleted Successfully");

      getEmployees();

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)" }}>
          Employees
        </h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn btn-primary" onClick={() => navigate("/addempl")}>
            + Add Employee
          </button>
          <button className="btn btn-outline" style={{ color: "var(--danger-color)", borderColor: "var(--danger-color)" }} onClick={() => {
            localStorage.removeItem("token");
            toast.success("Logout Successful");
            navigate("/");
          }}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
          Loading Employees...
        </div>
      ) : (
        <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ backgroundColor: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)" }}>
                <tr>
                  <th style={{ padding: "1rem", fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.875rem" }}>ID</th>
                  <th style={{ padding: "1rem", fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.875rem" }}>Employee</th>
                  <th style={{ padding: "1rem", fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.875rem" }}>Contact</th>
                  <th style={{ padding: "1rem", fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.875rem" }}>Role</th>
                  <th style={{ padding: "1rem", fontWeight: "600", color: "var(--text-secondary)", fontSize: "0.875rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ divideY: "1px solid var(--border-color)" }}>
                {employees.map((emp) => (
                  <tr key={emp.id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>#{emp.id}</td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img
                          src={emp.imgUrl && emp.imgUrl !== "no-image" ? emp.imgUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          alt={emp.name}
                          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border-color)" }}
                        />
                        <div>
                          <div style={{ fontWeight: "500", color: "var(--text-primary)" }}>{emp.name}</div>
                          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{emp.phoneNumber}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{emp.address}</div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "#e0e7ff", color: "#4338ca", fontSize: "0.75rem", fontWeight: "500" }}>
                        {emp.role}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }} onClick={() => navigate(`/update/${emp.eid}`)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" style={{ padding: "0.5rem 1rem" }} onClick={() => deleteEmployee(emp.eid)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;