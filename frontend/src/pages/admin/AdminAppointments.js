import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getAllAppointments } from "../../api/appointments";
import LoadingSpinner from "../../components/Loading";


export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout> 
    );
  }
  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pt-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              All Appointments
            </h1>
            <p className="text-gray-500">
              Monitor all appointments in the system.
            </p>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">

                    <td className="px-6 py-4">
                      {a.patientName || `${a.user?.firstName} ${a.user?.lastName}`}
                    </td>

                    <td className="px-6 py-4">
                      {a.doctorName || `${a.doctor?.user?.firstName} ${a.doctor?.user?.lastName}`}
                    </td>

                    <td className="px-6 py-4">
                      {a.date}
                    </td>

                    <td className="px-6 py-4">
                      {a.time}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          a.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : a.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {appointments.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No appointments found.
              </div>
            )}

          </div>

        </div>
      </div>
    </MainLayout>
  );
}