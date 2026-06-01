import React, { useState } from "react";
import { addempl } from "../API'S_&_Protection/API";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [role, setrole] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("role", role);

      const res = await addempl(formData);

      console.log(res.data);
      alert("Employee Added Successfully");
      navigate("/employee/getempls");

    } catch (err) {
      console.log(err.response || err);
      alert("Error adding employee");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <div style={{ background: "var(--bg-secondary)", padding: "2.5rem 2rem", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "450px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-color)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-primary)", fontWeight: "700", fontSize: "1.5rem" }}>Add Employee</h2>
        <form onSubmit={handlesubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Name</label>
            <input className="form-input" type="text" placeholder="John Doe" value={name} onChange={(e) => setname(e.target.value)} required />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="john@example.com" value={email} onChange={(e) => setemail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Phone</label>
            <input className="form-input" type="text" placeholder="+1 234 567 890" value={phone} onChange={(e) => setphone(e.target.value)} required />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Address</label>
            <input className="form-input" type="text" placeholder="123 Main St" value={address} onChange={(e) => setaddress(e.target.value)} required />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Role</label>
            <input className="form-input" type="text" placeholder="Software Engineer" value={role} onChange={(e) => setrole(e.target.value)} required />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate("/employee/getempls")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
