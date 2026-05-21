import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployee = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [role, setrole] = useState("");
  const [file, setfile] = useState(null);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {

    try {

      const res = await axios.get(
        `http://localhost:9091/employee/getempl/${id}`
      );

      console.log(res.data);

      setname(res.data.name);
      setemail(res.data.email);
      setphone(res.data.phone);
      setaddress(res.data.address);
      setrole(res.data.role);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load employee");

    }
  };

  const handlesubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);

    if (file) {
      formData.append("fi", file);
    }

    try {

      await axios.put(
        `http://localhost:9091/employee/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Employee Updated");

      navigate("/employee/getempls");

    } catch (err) {

      console.log(err);

      toast.error("Error updating employee");

    }
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f1f5f9"
      }}
    >

      <form
        onSubmit={handlesubmit}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Update Employee
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <input
          type="file"
          onChange={(e) => setfile(e.target.files[0])}
          style={{
            marginBottom: "20px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Update Employee
        </button>

      </form>

    </div>
  );
};

export default UpdateEmployee;