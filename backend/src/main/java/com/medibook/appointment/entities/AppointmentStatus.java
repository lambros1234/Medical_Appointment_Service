package com.medibook.appointment.entities;

public enum AppointmentStatus {
    PENDING,        // Appointment requested but not yet confirmed
    CONFIRMED,      // Accepted by doctor or auto-approved
    CANCELLED,      // Cancelled by patient or doctor
    COMPLETED,      // Appointment has taken place
    NO_SHOW         // Patient didn't show up
}
