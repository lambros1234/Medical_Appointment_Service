import { useEffect, useState } from "react";
import { getAppointments, cancelAppointment, confirmAppointment } from "../api/appointments";
import LoadingSpinner from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import AlertDialog from "../components/SuccessAlert";
import {
  Grid,
  Typography,
  Container,
  Box,
  Divider,
  Button,
  Card,
  CardContent
} from "@mui/material";

export default function DoctorAppointmentsList() {
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

        const normalized = data.map(a => ({
          ...a,
          id: a.id || a._id
        }));

        setAppointments(normalized);
        setFilteredAppointments(normalized);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAlertTitle("Error");
        setAlertMessage("Failed to load appointments");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const handleAccept = async (appointmentId) => {
    try {
      await confirmAppointment(appointmentId, "ACCEPTED");

      const updated = appointments.map(a =>
        a.id === appointmentId ? { ...a, status: "ACCEPTED" } : a
      );

      setAppointments(updated);
      setFilteredAppointments(updated);

      setAlertTitle("Success");
      setAlertMessage("Appointment accepted");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error accepting appointment:", error);
      setAlertTitle("Error");
      setAlertMessage("Failed to accept appointment");
      setAlertOpen(true);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId, "CANCELLED");

      const updated = appointments.map(a =>
        a.id === appointmentId ? { ...a, status: "CANCELLED" } : a
      );

      setAppointments(updated);
      setFilteredAppointments(updated);

      setAlertTitle("Success");
      setAlertMessage("Appointment cancelled");
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

          <Typography variant="h4" fontWeight={700} gutterBottom>
            My Appointments
          </Typography>

          <Typography color="text.secondary" mb={3}>
            Review and manage patient appointments.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {filteredAppointments.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h6">
                No appointments found
              </Typography>
              <Typography color="text.secondary">
                You currently have no scheduled appointments.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredAppointments.map((appointment) => (
                <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {appointment.date} - {appointment.time}
                      </Typography>

                      <Typography color="text.secondary">
                        Patient: {appointment.patientName}
                      </Typography>

                      <Typography mt={1}>
                        Status: {appointment.status}
                      </Typography>

                      {appointment.status === "PENDING" && (
                        <Box mt={2} display="flex" gap={1}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAccept(appointment.id)}
                          >
                            Accept
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
}