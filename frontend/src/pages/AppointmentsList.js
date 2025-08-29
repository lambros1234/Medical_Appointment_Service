import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments"; 
import MainLayout from "../layouts/MainLayout";
import AppointmentCard from "../components/AppointmentCard";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        console.log(data);
        setAppointments(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      
            {appointments.length === 0 ? (
              <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">No Appointments.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {appointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    onEdit={(id) => console.log("Edit", id)} 
                    onDelete={(id) => console.log("Delete", id)} 
                  />               
                ))}
              </div>
            )}

    </MainLayout>
  );
}
