package com.medibook.appointment.dto;

import com.medibook.appointment.entities.Specialty;

import java.util.List;

public class DoctorDTO {

    private Long id;
    private String username;
    private List<Specialty> specialties;
    private String location;


    public DoctorDTO(Long id, String username, List<Specialty> specialties, String location) {
        this.id = id;
        this.username = username;
        this.specialties = specialties;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Specialty> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<Specialty> specialties) {
        this.specialties = specialties;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
