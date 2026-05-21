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

    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >

        <button
          onClick={() => navigate("/addempl")}
          style={{
            padding: "12px 25px",
            backgroundColor: "#000",
            color: "lime",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          + Add Employee
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Logout Successful");
            navigate("/");
          }}
          style={{
            padding: "12px 25px",
            backgroundColor: "#000",
            color: "red",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333"
        }}
      >
        Employee Management System
      </h1>

      {
        loading ? (

          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "50px"
            }}
          >
            Loading Employees...
          </div>

        ) : (

          <table
            border="1"
            width="100%"
            cellPadding="12"
            style={{
              borderCollapse: "collapse",
              backgroundColor: "white",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
            }}
          >

            <thead
              style={{
                backgroundColor: "#1976d2",
                color: "white"
              }}
            >

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Image</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {
                employees.map((emp) => (

                  <tr
                    key={emp.id}
                    style={{
                      textAlign: "center"
                    }}
                  >

                    <td>{emp.id}</td>

                    <td>{emp.name}</td>

                    <td>{emp.email}</td>

                    <td>

                      <img
                        src={
                          emp.imgUrl && emp.imgUrl !== "no-image"
                            ? emp.imgUrl
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="employee"
                        width="70"
                        height="70"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />

                    </td>

                    <td>{emp.phoneNumber}</td>

                    <td>{emp.address}</td>

                    <td>{emp.role}</td>

                    <td>

                      <button
                        onClick={() => deleteEmployee(emp.eid)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => navigate(`/update/${emp.eid}`)}
                        style={{
                          backgroundColor: "#1976d2",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginLeft: "10px",
                          fontWeight: "bold"
                        }}
                      >
                        Update
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        )
      }

    </div>
  );
};

export default EmployeeTable;