import React, { useState } from "react";
import ProfilePic from "../assets/Profile.jpg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { fetchAvailability } from "../api/availability"; 
import Button from "./BookButton";
import { createAppointment } from "../api/appointments";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const dayMap = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  // Fetch availability from API
  const loadAvailability = async () => {
    try {
      const res = await fetchAvailability(doctor.id); 
      setAvailability(res); 
    } catch (err) {
      console.error("Failed to fetch availability", err);
    }
  };

  const handleBookClick = () => {
    setOpen(true);
    loadAvailability();
  };

  const handleConfirm = async () => {
    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }

    try {
      const appointmentRequest = {
        doctorId: doctor.id,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedDate.format("HH:mm"),
        description: "General check-up", // MAKE THIS LATER
      };

      console.log("Appointment", appointmentRequest);

      const res = await createAppointment(appointmentRequest);

      alert(`Appointment booked successfully on ${appointmentRequest.date} at ${appointmentRequest.time}`);
      console.log("Created appointment:", res);

      setOpen(false);
    } catch (err) {
      console.error("Failed to create appointment", err);
      alert("Failed to create appointment. Please try again.");
    }
  };
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition px-12">
      <img
        src={ProfilePic}
        alt={doctor.username}
        className="w-24 h-24 rounded-full object-cover mx-auto"
      />

      <h2 className="text-lg font-semibold text-center mt-2">
        {doctor.username}
      </h2>

      <p className="text-gray-600 text-center text-sm">
        {doctor.specialties?.length
          ? doctor.specialties.map((s) => s.name).join(", ")
          : "No specialties"}
      </p>

      <p className="text-gray-500 text-center text-sm">
        {doctor.location || "Unknown location"}
      </p>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleBookClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </Button>
      </div>

      {open && (
        <div className="mt-4 border p-4 rounded bg-gray-50">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select appointment time"
              value={selectedDate}
              onChange={setSelectedDate}
              shouldDisableDate={(date) => {
                const allowedDays = availability.map(
                  (a) => dayMap[a.dayOfWeek.toUpperCase()]
                );
                return !allowedDays.includes(date.day());
              }}
              shouldDisableTime={(timeValue, clockType) => {
                if (!selectedDate) return false;

                const dayAvailability = availability.find(
                  (a) =>
                    dayMap[a.dayOfWeek.toUpperCase()] === selectedDate.day()
                );

                if (!dayAvailability) return true;

                const start = dayjs(dayAvailability.startTime, "HH:mm");
                const end = dayjs(dayAvailability.endTime, "HH:mm");

                if (clockType === "hours") {
                  return timeValue < start.hour() || timeValue > end.hour();
                }
                if (clockType === "minutes") {
                  const selectedHour = selectedDate.hour();
                  if (selectedHour === start.hour())
                    return timeValue < start.minute();
                  if (selectedHour === end.hour())
                    return timeValue > end.minute();
                }

                return false;
              }}
            />
          </LocalizationProvider>

          <button
            onClick={handleConfirm}
            className="mt-3 bg-green-500 text-white px-5 py-2 rounded"
          >
            Confirm
          </button>
          <button
              onClick={() => setOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              ✕
            </button>
        </div>
      )}
    </div>
  );
}
