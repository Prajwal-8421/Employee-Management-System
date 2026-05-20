
    import axios from "axios";
    //Employee API'S
    export const emplurl="http://localhost:8080/employee"
    export const getAllemplo=async()=>{return await axios.get(emplurl+"/getempls",{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})};
    export const delempl=async(id)=>{return await axios.delete(emplurl+"/"+"delete/"+id,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})};
    export const getempl=async(id)=>{return await axios.get(emplurl+"/getempl/"+id,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})};
    export const addempl=async(empl)=>{return await axios.post(emplurl+"/Addempl",empl,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})};
    export const update=async(id,empl)=>{return await axios.put(emplurl+`/update/${id}`,empl,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})};
    
    //ADMIN API'S
    export const adminurl="http://localhost:8080/access/login"
    export const getAccess=async(admin)=>{return await axios.post(adminurl,admin)};
