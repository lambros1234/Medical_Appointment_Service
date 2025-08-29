import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/LogIn";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AppointmentsList from "../components/AppointmentsList";
import UserList from "../pages/UserList";
import DoctorAvailabilityForm from "../pages/DoctorAvailabilityForm";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments" element={<AppointmentsList/>}/>
      <Route path="/users" element={<UserList/>}/>
      <Route path="/availability" element={<DoctorAvailabilityForm/>}/>


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
