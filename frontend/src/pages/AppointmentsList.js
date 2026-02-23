import { useEffect, useState } from "react";
import { getAppointments, cancelAppointment } from "../api/appointments";
import LoadingSpinner from "../components/Loading";
import AppointmentCard from "../components/AppointmentCard";
import MainLayout from "../layouts/MainLayout";
import AlertDialog from "../components/SuccessAlert";
import {
  Grid,
  Typography,
  Container,
  Box,
  Divider,
} from "@mui/material";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getAppointments();
        // Normalize appointments to ensure each has an 'id' property
        const normalized = data.map(a => ({
          ...a,
          id: a.id || a._id // fallback if backend uses _id
        }));
        setAppointments(normalized);
        setFilteredAppointments(normalized);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      setAppointments(appointments.filter(a => a.id !== appointmentId));
      setFilteredAppointments(filteredAppointments.filter(a => a.id !== appointmentId));
      setAlertTitle("Success");
      setAlertMessage("Appointment cancelled successfully");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setAlertTitle("Error");
      setAlertMessage("Failed to cancel appointment");
      setAlertOpen(true);
    }
  };


  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout>
      <AlertDialog
        open={alertOpen}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
      <Box sx={{ bgcolor: "#fafafa", py: 10 }}>
        <Container maxWidth="lg">
          
          {/* Header */}
          <Typography variant="h4" fontWeight={700} gutterBottom>
            My Appointments
          </Typography>

          <Typography color="text.secondary" mb={3}>
            Review and manage your scheduled appointments.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* Empty state */}
          {filteredAppointments.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h6">
                No appointments found
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your search.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredAppointments.map((appointment) => (
                <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
                  <AppointmentCard 
                    appointment={appointment}
                    onCancel={handleCancel}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
}