package com.medibook.appointment.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "Specialties")
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "specialties")
    private List<Doctor_Profile> doctors;

    public Specialty() {}

    public Specialty(List<Doctor_Profile> doctors, int id, String name) {
        this.doctors = doctors;
        this.id = id;
        this.name = name;
    }

    public List<Doctor_Profile> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<Doctor_Profile> doctors) {
        this.doctors = doctors;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Specialty{" +
                "doctors=" + doctors +
                ", id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
