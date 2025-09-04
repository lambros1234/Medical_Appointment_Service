package com.medibook.appointment.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequestDTO {
    private Long doctorId;
    private LocalDate date;
    private LocalTime time;
    private String description;

    public AppointmentRequestDTO(Long doctorId, LocalTime time, String description, LocalDate date) {
        this.doctorId = doctorId;
        this.time = time;
        this.description = description;
        this.date = date;
    }

    public AppointmentRequestDTO() {}

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
