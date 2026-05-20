import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Login_folder/Login";   
import EmployeeTable from './admin_page/Emplo_Details';
import ProtectedRoute from './API\'S_&_Protection/ProtectedRoute';
import AddEmployee from './admin_page/Addempl';
import UpdateEmployee from './admin_page/updateempl';
function App() {
  return (
    <Routes>
      <Route path="/"  element={<Login/>}/>
      <Route path="/employee/getempls"  element={<ProtectedRoute element={EmployeeTable}/>}/>
      <Route path="/addempl" element={<ProtectedRoute element={AddEmployee}/>}/>
      <Route path="/update/:id" element={<ProtectedRoute element={UpdateEmployee}/>}/>
    </Routes>
  );
}

export default App;