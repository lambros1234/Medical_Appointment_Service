import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import CalendarCard from "../../components/dashboard/CalendarCard";
import { useEffect, useState } from "react";
import { getDoctorDashboardStats } from "../../api/dashboard";
import { getAppointments } from "../../api/appointments";

export default function DoctorDashboard() {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const statsData = await getDoctorDashboardStats();
      const appointmentsData = await getAppointments();

      setStats(statsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="pt-24 text-center text-gray-500">
          Loading dashboard...
        </div>
      </MainLayout>
    );
  }

  const filteredAppointments = selectedDate
    ? appointments.filter(
        (a) => a.date === selectedDate.toISOString().split("T")[0]
      )
    : appointments.slice(0, 5);

  return (
    <MainLayout>
      <div className="bg-slate-50 h-[calc(100vh-80px)] overflow-hidden pt-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Doctor Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Overview of your appointments and activity.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Appointments"
              value={stats?.totalAppointments || 0}
              icon="📅"
              color="bg-blue-100"
            />
            <StatCard
              title="Pending"
              value={stats?.pendingAppointments || 0}
              icon="⏳"
              color="bg-yellow-100"
            />
            <StatCard
              title="Confirmed"
              value={stats?.confirmedAppointments || 0}
              icon="✅"
              color="bg-emerald-100"
            />
            <StatCard
              title="Today"
              value={stats?.todayAppointments || 0}
              icon="📍"
              color="bg-purple-100"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100%-160px)]">

            {/* Appointment List */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">
                {selectedDate
                  ? `Appointments on ${selectedDate.toDateString()}`
                  : "Upcoming Appointments"}
              </h2>

              {filteredAppointments.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No appointments for this date.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((a) => (
                    <div
                      key={a.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {a.patientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {a.date} at {a.time}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          a.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="space-y-6">
              <CalendarCard
                appointments={appointments}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}