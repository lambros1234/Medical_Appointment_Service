import { useEffect, useMemo, useState } from "react";
import { getDoctorsFull } from "../../api/doctors";
import LoadingSpinner from "../../components/Loading";
import DoctorCard from "../../components/DoctorCard";
import MainLayout from "../../layouts/MainLayout";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  Divider,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctorsFull();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) =>
      (doc.username || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, doctors]);

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout>
      <Box sx={{ bgcolor: "#f6f8fc", py: 8 }}>
        <Container maxWidth="lg">
          {/* Modern header strip */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "white",
              boxShadow: "0 6px 20px rgba(20, 30, 60, 0.06)",
              mb: 4,
            }}
          >
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Find a Doctor
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Browse verified doctors and book an appointment in minutes.
            </Typography>

            <TextField
              fullWidth
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label={`${filteredDoctors.length} results`} />
              {/* Optional chips for future filters */}
              {/* <Chip label="Cardiology" variant="outlined" /> */}
            </Box>
          </Box>

          {/* Content */}
          <Divider sx={{ mb: 4 }} />

          {filteredDoctors.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h6">No doctors found</Typography>
              <Typography color="text.secondary">
                Try a different search.
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