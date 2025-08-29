import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorsList from "./pages/DoctorList";
import LogIn from "./pages/LogIn.js"
import Register from "./pages/Register.js"
import AppointmentsList from "./pages/AppointmentsList.js";
import UserList from "./pages/UserList.js";
import DoctorAvailabilityForm from "./pages/DoctorAvailabilityForm";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/appointments" element={<AppointmentsList/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/availability" element={<DoctorAvailabilityForm/>}/>
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;

