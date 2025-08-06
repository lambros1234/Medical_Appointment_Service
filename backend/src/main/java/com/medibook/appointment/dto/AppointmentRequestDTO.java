package com.medibook.appointment.dto;

public class AppointmentRequestDTO {
    private Long doctorId;
    private String date;
    private String time;
    private String description;

    public AppointmentRequestDTO(Long doctorId, String time, String description, String date) {
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
}
