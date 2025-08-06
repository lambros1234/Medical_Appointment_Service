package com.medibook.appointment.dto;

import com.medibook.appointment.entities.AppointmentStatus;

public class AppointmentResponseDTO {
    private Long id;
    private String date;
    private String time;
    private String description;
    private AppointmentStatus status;
    private String doctorName;
    private String patientName;

    public AppointmentResponseDTO(String date, String time, AppointmentStatus status, String description, String doctorName, String patientName) {
        this.date = date;
        this.time = time;
        this.status = status;
        this.description = description;
        this.doctorName = doctorName;
        this.patientName = patientName;
    }

    public AppointmentResponseDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
}
