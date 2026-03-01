import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import ActivityList from "../../components/dashboard/ActivityList";



// TODO: Fetch real data for stats and activities, and implement real links for quick actions

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Users" value="120" icon="👥" color="text-blue-600" />
            <StatCard title="Pending Approvals" value="4" icon="⏳" color="text-yellow-600" />
            <StatCard title="Total Doctors" value="35" icon="🩺" color="text-green-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Manage Users"
              description="Approve, edit or remove users"
              icon="⚙️"
              to="/users"
            />
          </div>

          <ActivityList
            items={[
              "New doctor registered",
              "User approved successfully",
            ]}
          />

        </div>
      </div>
    </MainLayout>
  );
}