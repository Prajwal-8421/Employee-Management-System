import React, { useState } from "react";
import "./Addempl.css";
import { addempl } from "../API'S_&_Protection/API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [loading, setLoading] = useState(false);
  const [img,setimg]=useState(false);
  const nav=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { name, email, phone, address, role };
      const form=new FormData();
      form.append("req",JSON.stringify(data));
      form.append("file",img);
      await addempl(form);
      toast.success("Employee added successfully!");
      setname("");
      setemail("");
      setphone("");
      setaddress("");
      setrole("");
      nav("/employee/getempls");

    } catch (error) {
      console.error(error);
      toast.error("Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            required
          />
          <input type="file" onChange={(e)=>setimg(e.target.files[0])} />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;