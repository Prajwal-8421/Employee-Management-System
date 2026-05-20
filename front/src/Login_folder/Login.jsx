import React, { useState } from "react";
import "./login.css"
import { getAccess } from "../API'S_&_Protection/API";
import { toast } from "react-toastify";
import { useNavigate  } from "react-router-dom";
const Login=()=>{
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [Loading,setLoading]=useState(false);
  const Navigate=useNavigate();
  const handlesubmit =async(e)=>
  {
    e.preventDefault();
    setLoading(true);
    try{
      const data={email,password};
      const res=await getAccess(data);
      if(res.status==200)
      {
        localStorage.setItem("token",res.data.token);
        toast.success("Login successfull");
        console.log(res.data);
        setemail("");
        setpassword("");
        Navigate("/employee/getempls");
      }
        else
         {
           setemail("");
        setpassword("")
          toast.error("Invalid email or password!");
         }
    }
    catch(e)
    {
      toast.error("Login failed");
    }
    finally{
      setLoading(false);
    }
  }
    return (
  <div className="login-container">
    <form className="login-form"  onSubmit={handlesubmit}>
      <h2>Login</h2>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        />
        
      </div>

      <button type="submit">{Loading==true? "Logging" :"Login"}</button>
    </form>
  </div>
);
}
export default Login;