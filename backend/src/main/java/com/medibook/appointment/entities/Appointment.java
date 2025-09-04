package com.medibook.appointment.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    @JsonIgnore
    private Doctor_Profile doctor;


    public Appointment() {}

    public Appointment(LocalDate date, String description, AppointmentStatus status, LocalTime time) {
        this.date = date;
        this.description = description;
        this.status = status;
        this.time = time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Doctor_Profile getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor_Profile doctor) {
        this.doctor = doctor;
    }
}
