import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import { getAdminDashboardStats } from "../../api/dashboard";
import AdminAppointmentsChart from "../../components/dashboard/AdminAppointmentsChart";
import { getAppointmentsPerMonth } from "../../api/dashboard";
import LoadingSpinner from "../../components/Loading";


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 10000); // refresh every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
      
      const AppointmetntData = await getAppointmentsPerMonth();
      setChartData(AppointmetntData);
    } catch (error) {
      console.error("Failed to load admin dashboard stats", error);
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
      <div className="bg-slate-50 h-[calc(100vh-80px)] overflow-hidden pt-10">
        <div className="max-w-7xl mx-auto space-y-8 px-6">

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={stats?.totalUsers || 0}
              icon="👥"
              color="text-blue-600"
            />

            <StatCard
              title="Pending Approvals"
              value={stats?.pendingDoctors || 0}
              icon="⏳"
              color="text-yellow-600"
            />

            <StatCard
              title="Total Doctors"
              value={stats?.totalDoctors || 0}
              icon="🩺"
              color="text-green-600"
            />

            <StatCard
              title="Total Appointments"
              value={stats?.totalAppointments || 0}
              icon="📅"
              color="text-purple-600"
            />
          </div>

          {/* Chart */}
          <div className="mt-8">
            <AdminAppointmentsChart data={chartData} />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Manage Users"
              description="Approve, edit or remove users"
              icon="⚙️"
              to="/users"
            />
            
            <QuickActionCard
              title="View Appointments"
              description="Monitor all appointments in the system"
              icon="📅"
              to="/admin/appointments"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}