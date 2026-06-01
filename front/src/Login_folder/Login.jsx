import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const Navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(email === "admin@gmail.com" && password === "admin")
    {
      localStorage.setItem("token","admin");

toast.success("Login Successful");

Navigate("/employee/getempls");
    }
    else
    {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handlesubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder="admin@gmail.com"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
