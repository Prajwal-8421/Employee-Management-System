import React, { useEffect, useState } from "react";
import "./Addempl.css";
import { updateempl, getemplById, getempl, update } from "../API'S_&_Protection/API";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [img, setimg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getempl(id);
        console.log(res.data);
        setname(res.data.name);
        setemail(res.data.email);
        setphone(res.data.phoneno);
        setaddress(res.data.address);
        setrole(res.data.role);

      } catch (err) {
        console.error(err);
        toast.error("Failed to load employee");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { name, email, phone, address, role };

      const form = new FormData();
      form.append("req", JSON.stringify(data));

      if (img) {
        form.append("file", img);
      }

      await update(id, form);

      toast.success("Employee updated successfully!");
      nav("/employee/getempls");

    } catch (error) {
      console.error(error);
      toast.error("Error updatin    g employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Update Employee</h2>

        <form onSubmit={handleUpdate}>
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

          <input
            type="file"
            onChange={(e) => setimg(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;