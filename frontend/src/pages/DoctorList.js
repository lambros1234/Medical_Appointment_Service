import { useEffect, useState } from "react";
import { getDoctorsFull } from "../api/doctors";
import LoadingSpinner from "../components/Loading";
import DoctorCard from "../components/DoctorCard";
import MainLayout from "../layouts/MainLayout";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  Divider,
} from "@mui/material";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctorsFull();

        setDoctors(data);
        setFilteredDoctors(data);

      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doc) =>
      doc.username?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, doctors]);

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout>
      <Box sx={{ bgcolor: "#fafafa", py: 10 }}>        
        <Container maxWidth="lg">
          {/* Header */}
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Available Doctors
          </Typography>

          <Typography color="text.secondary" mb={3}>
            Browse doctors and book your appointment.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 4 }}
          />

          {/* Empty state */}
          {filteredDoctors.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h6">No doctors found</Typography>
              <Typography color="text.secondary">
                Try adjusting your search.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredDoctors.map((doctor) => (
                <Grid item xs={12} sm={6} lg={4} key={doctor.id}>
                  <DoctorCard doctor={doctor} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
}