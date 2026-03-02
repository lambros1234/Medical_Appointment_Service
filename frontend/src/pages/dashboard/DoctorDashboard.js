import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import ActivityList from "../../components/dashboard/ActivityList";

// TODO: Fetch real data for stats and activities, and implement real links for quick actions

export default function DoctorDashboard() {
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">

          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Today's Appointments" value="5" icon="📅" color="text-blue-600" />
            <StatCard title="Pending Requests" value="2" icon="⏳" color="text-yellow-600" />
            <StatCard title="Total Patients" value="48" icon="👥" color="text-purple-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Manage Appointments"
              description="Accept or cancel bookings"
              icon="📋"
              to="/doctor-appointments"
            />
            <QuickActionCard
              title="Set Availability"
              description="Update your working schedule"
              icon="🕒"
              to="/availability"
            />
          </div>

          <ActivityList
            items={[
              "New appointment request from John",
              "Appointment confirmed for Maria",
            ]}
          />

        </div>
      </div>
    </MainLayout>
  );
}