import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import AlertDialog from "../../components/SuccessAlert";
import {
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MainLayout from "../../layouts/MainLayout";
import {
  fetchMyAvailability,
  addAvailability,
  deleteAvailability,
} from "../../api/availability";

export default function DoctorAvailabilityForm() {
  const [dayOfWeek, setDayOfWeek] = useState("MONDAY");
  const [startTime, setStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [endTime, setEndTime] = useState(dayjs("12:00", "HH:mm"));
  const [availabilities, setAvailabilities] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const data = await fetchMyAvailability();
        setAvailabilities(data);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };

    loadAvailability();
  }, []);

  const handleSubmit = async () => {
    if (endTime.isBefore(startTime)) {
      alert("End time must be after start time.");
      return;
    }

    const newAvailability = {
      dayOfWeek,
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
    };

    try {
      const saved = await addAvailability(newAvailability);
      console.log("Saved availability:", saved);
      setAvailabilities((prev) => [...prev, saved]);
      setAlertOpen(true);
    } catch (err) {
      console.error("Failed to save availability", err);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting id:", id);

    try {
      await deleteAvailability(id);
      setAvailabilities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete availability", err);
    }
  };

  return (
    <MainLayout>
      <AlertDialog
        open={alertOpen}
        title="Availability Saved"
        message="Your availability has been added successfully."
        onClose={() => setAlertOpen(false)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ bgcolor: "#fafafa", py: 10 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Manage Availability
            </Typography>

            <Card sx={{ mb: 5 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Select
                      fullWidth
                      value={dayOfWeek}
                      onChange={(e) => setDayOfWeek(e.target.value)}
                    >
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleSubmit}
                    >
                      Save Availability
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h6" gutterBottom>
              Current Availability
            </Typography>

            {availabilities.length === 0 ? (
              <Typography>No availability set yet.</Typography>
            ) : (
              <Grid container spacing={3}>
                {availabilities.map((a) => (
                  <Grid item xs={12} sm={6} key={a.id}>
                    <Card>
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography fontWeight={600}>
                            {a.dayOfWeek}
                          </Typography>
                          <Typography color="text.secondary">
                            {a.startTime} - {a.endTime}
                          </Typography>
                        </Box>

                        <IconButton
                          color="error"
                          onClick={() => handleDelete(a.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </LocalizationProvider>
    </MainLayout>
  );
}