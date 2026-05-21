import React, { useState } from "react";
import axios from "axios";

const AddEmployee = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [role, setrole] = useState("");
  const [file, setfile] = useState(null);

  const handlesubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);

    if (file) {
      formData.append("fi", file);
    }

    const res = await axios.post(
      "http://localhost:9091/employee/addempl",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    alert("Employee Added Successfully");

  } catch (err) {
    console.log(err.response || err);
    alert("Error adding employee");
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>

      <form onSubmit={handlesubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">
          Add Employee
        </button>

      </form>
    </div>
  );
};

export default AddEmployee;