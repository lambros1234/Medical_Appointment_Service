import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import { fetchAvailability, addAvailability } from "../api/availability";

export default function DoctorAvailabilityForm() {
  const [dayOfWeek, setDayOfWeek] = useState("MONDAY");
  const [startTime, setStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [endTime, setEndTime] = useState(dayjs("12:00", "HH:mm"));
  const [availabilities, setAvailabilities] = useState([]);

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // Load availabilities on mount
  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const data = await fetchAvailability();
        setAvailabilities(data);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };

    loadAvailability();
  }, []);

  const handleSubmit = async () => {
    const newAvailability = {
      dayOfWeek,
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
    };

    try {
      const saved = await addAvailability(newAvailability);
      setAvailabilities((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Failed to save availability", err);
    }
  };

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ maxWidth: 400, margin: "auto", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add Availability
          </Typography>

          {/* Day of Week Selector */}
        <Select
            fullWidth
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            sx={{ mb: 2, height: 40, mt: 6 }} // adjust height here
            >
            {days.map((day) => (
                <MenuItem key={day} value={day}>
                {day}
                </MenuItem>
            ))}
        </Select>


          {/* Start Time */}
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            sx={{ mb: 2, width: "100%" }}
          />

          {/* End Time */}
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            sx={{ mb: 2, width: "100%" }}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Save Availability
          </Button>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Current Availability
          </Typography>
          <List>
            {availabilities.map((a, idx) => (
              <ListItem key={idx}>
                {a.dayOfWeek}: {a.startTime} - {a.endTime}
              </ListItem>
            ))}
          </List>
        </Box>
      </LocalizationProvider>
    </MainLayout>
  );
}
