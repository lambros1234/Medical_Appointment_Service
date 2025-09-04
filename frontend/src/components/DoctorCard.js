import React, { useState } from "react";
import ProfilePic from "../assets/Profile.jpg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "./BookButton";
import { fetchAvailability } from "../api/availability";
import { fetchDoctorAppointments, createAppointment } from "../api/appointments";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const dayMap = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const loadAvailability = async () => {
    try {
      const res = await fetchAvailability(doctor.id);
      setAvailability(res || []);
    } catch (err) {
      console.error("Failed to fetch availability", err);
      setAvailability([]);
    }
  };
  const handleBookClick = () => {
    setOpen(true);
    loadAvailability();
  };

  const getDayAvailability = (dayIndex) => {
    return availability.find(
      (a) => dayMap[a.dayOfWeek.toUpperCase()] === dayIndex
    );
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null);

    if (!date) {
      setAvailableSlots([]);
      setBookedAppointments([]);
      return;
    }

    const dayAvailability = getDayAvailability(date.day());
    if (!dayAvailability) {
      setAvailableSlots([]);
      setBookedAppointments([]);
      return;
    }

    // Load booked appointments first
    const appointments = await fetchDoctorAppointments(doctor.id, date);
    setBookedAppointments(appointments || []);

    // Generate all possible slots
    const start = dayjs(dayAvailability.startTime, "HH:mm");
    const end = dayjs(dayAvailability.endTime, "HH:mm");
    const slots = [];
    let current = start.clone();
    while (current.isBefore(end)) {
      slots.push(current.format("HH:mm"));
      current = current.add(30, "minute");
    }

    // Filter out booked slots
    const bookedTimes = (appointments || []).map((appt) => appt.time);
    const filteredSlots = slots.filter((slot) => !bookedTimes.includes(slot));

    setAvailableSlots(filteredSlots);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    try {
      const appointmentRequest = {
        doctorId: doctor.id,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime,
        description: "General check-up",
      };

      await createAppointment(appointmentRequest);

      alert(
        `Appointment booked successfully on ${appointmentRequest.date} at ${appointmentRequest.time}`
      );

      // Reset
      setOpen(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots([]);
      setBookedAppointments([]);
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
            <DatePicker
              label="Select appointment date"
              value={selectedDate}
              onChange={handleDateChange}
              shouldDisableDate={(date) => {
                if (!availability || availability.length === 0) return false;
                const allowedDays = availability.map(
                  (a) => dayMap[a.dayOfWeek.toUpperCase()]
                );
                return !allowedDays.includes(date.day());
              }}
            />
          </LocalizationProvider>

          {availableSlots.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 font-semibold">Available times:</p>
              <div className="flex flex-wrap gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-1 rounded border ${
                      selectedTime === slot
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white px-5 py-2 rounded"
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
        </div>
      )}
    </div>
  );
}
