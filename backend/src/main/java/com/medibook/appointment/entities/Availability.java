package com.medibook.appointment.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor_Profile doctor;

    public Availability() {}

    public Availability(Doctor_Profile doctor_profile, int id) {
        this.doctor = doctor_profile;
        this.id = id;
    }

    public Doctor_Profile getDoctor_profile() {
        return doctor;
    }

    public void setDoctor_profile(Doctor_Profile doctor_profile) {
        this.doctor = doctor_profile;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
