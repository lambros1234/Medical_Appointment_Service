import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import ActivityList from "../../components/dashboard/ActivityList";

// TODO: Fetch real data for stats and activities, and implement real links for quick actions

export default function PatientDashboard() {
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">

          <h1 className="text-3xl font-bold">Patient Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Upcoming Appointments" value="3" icon="📅" color="text-blue-600" />
            <StatCard title="Completed Visits" value="12" icon="✅" color="text-green-600" />
            <StatCard title="Pending Requests" value="1" icon="⏳" color="text-yellow-600" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Book Appointment"
              description="Find a doctor and schedule a visit"
              icon="➕"
              to="/doctors"
            />
            <QuickActionCard
              title="My Appointments"
              description="View and manage your appointments"
              icon="📋"
              to="/appointments"
            />
          </div>

          <ActivityList
            items={[
              "Appointment confirmed for 12 March",
              "Appointment cancelled for 5 March",
            ]}
          />

        </div>
      </div>
    </MainLayout>
  );
}