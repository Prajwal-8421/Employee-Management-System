import React, { useEffect, useState } from "react";
import { getempl, update } from "../API'S_&_Protection/API";
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

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {

    try {

      const res = await getempl(id);

      console.log(res.data);

      setname(res.data.name);
      setemail(res.data.email);
      setphone(res.data.phoneno);
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

    try {

      await update(id, formData);

      toast.success("Employee Updated");

      navigate("/employee/getempls");

    } catch (err) {

      console.log(err);

      toast.error("Error updating employee");

    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <div style={{ background: "var(--bg-secondary)", padding: "2.5rem 2rem", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "450px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-color)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-primary)", fontWeight: "700", fontSize: "1.5rem" }}>Update Employee</h2>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
