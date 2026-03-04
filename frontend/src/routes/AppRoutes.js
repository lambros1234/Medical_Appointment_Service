import { Routes, Route } from "react-router-dom";
import Login from "../pages/public/LogIn";
import Register from "../pages/public/Register";
import AppointmentsList from "../pages/patient/AppointmentsList";
import UserList from "../pages/admin/UserList";
import DoctorAvailabilityForm from "../pages/doctor/DoctorAvailabilityForm";
import DoctorAppointmentsList from "../pages/doctor/DoctorAppointmentsList";
import DoctorList from "../pages/patient/DoctorList";
import Home from "../pages/public/Home";
import PatientDashboard from "../pages/dashboard/PatientDashboard";
import DoctorDashboard from "../pages/dashboard/DoctorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AdminAppointments from "../pages/admin/AdminAppointments";
import SettingsPage from "../pages/settings/SettingsPage";

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
      <Route path="/dashboard/patient" element={<PatientDashboard />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/admin/appointments" element={<AdminAppointments />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
