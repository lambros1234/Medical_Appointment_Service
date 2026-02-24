import { Routes, Route } from "react-router-dom";
import Login from "../pages/LogIn";
import Register from "../pages/Register";
import AppointmentsList from "../pages/AppointmentsList";
import UserList from "../pages/UserList";
import DoctorAvailabilityForm from "../pages/DoctorAvailabilityForm";
import DoctorAppointmentsList from "../pages/DoctorAppointmentsList";
import DoctorList from "../pages/DoctorList";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments" element={<AppointmentsList/>}/>
      <Route path="/users" element={<UserList/>}/>
      <Route path="/availability" element={<DoctorAvailabilityForm/>}/>
      <Route path="/doctor-appointments" element={<DoctorAppointmentsList/>}/>
      <Route path="/doctors" element={<DoctorList/>}/>
    </Routes>
  );
}
