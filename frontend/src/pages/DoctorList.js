import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctors";
import LoadingSpinner from "../components/Loading";
import DoctorCard from "../components/DoctorCard";
import MainLayout from "../layouts/MainLayout";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Available Doctors</h1>

      {doctors.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600">No doctors available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}
