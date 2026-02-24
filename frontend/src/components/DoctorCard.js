import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  Select,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import AlertDialog from "./SuccessAlert";
import { fetchSlots } from "../api/availability";
import { createAppointment } from "../api/appointments";

export default function DoctorCard({ doctor }) {
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    setSelectedSlot("");

    if (!newDate) return;

    try {
      const formatted = dayjs(newDate).format("YYYY-MM-DD");
      const data = await fetchSlots(doctor.id, formatted);
      setSlots(data);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    }
  };

  const handleBook = () => {
    if (!date || !selectedSlot) {
      setAlertTitle("Missing info");
      setAlertMessage("Please select date and time");
      setAlertOpen(true);
      return;
    }
    const appointment = {
      doctorId: doctor.id,
      date: dayjs(date).format("YYYY-MM-DD"),
      time: selectedSlot,
    };

    createAppointment(appointment)
      .then(() => {
        setAlertTitle("Appointment booked");
        setAlertMessage(
          `Booked with ${doctor.username} on ${dayjs(date).format(
            "DD MMM YYYY"
          )} at ${selectedSlot}`
        );
        setAlertOpen(true);
      })
      .catch((err) => {
        setAlertTitle("Error");
        setAlertMessage("Failed to book appointment");
        setAlertOpen(true);
      });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    if (alertTitle === "Appointment booked") {
      window.location.reload();
    }
  };

  return (
    <>
      <AlertDialog
        open={alertOpen}
        title={alertTitle}
        message={alertMessage}
        onClose={handleAlertClose}
      />

      <Card sx={{ borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Dr. {doctor.username}
          </Typography>

          <Typography color="text.secondary" mb={2}>
            📍 {doctor.location}
          </Typography>

          {/* DATE PICKER */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={handleDateChange}
              disablePast
              sx={{ mb: 2, width: "100%" }}
            />
          </LocalizationProvider>

          {/* SLOT SELECT */}
          {slots.length > 0 ? (
            <Select
              fullWidth
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              sx={{ mb: 2 }}
            >
              {slots.map((slot, i) => (
                <MenuItem key={i} value={slot.startTime}>
                  {slot.startTime} - {slot.endTime}
                </MenuItem>
              ))}
            </Select>
          ) : date ? (
            <Typography color="text.secondary" mb={2}>
              No slots available
            </Typography>
          ) : null}

          <Button
            variant="contained"
            fullWidth
            disabled={!selectedSlot}
            onClick={handleBook}
          >
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </>
  );
}