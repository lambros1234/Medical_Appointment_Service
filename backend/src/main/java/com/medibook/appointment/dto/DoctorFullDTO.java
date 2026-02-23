package com.medibook.appointment.dto;

import java.util.List;

public class DoctorFullDTO {

    private Long id;
    private String username;
    private String location;
    private List<String> specialties;
    private List<AvailabilityDTO> availability;

    public DoctorFullDTO() {}

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<String> specialties) {
        this.specialties = specialties;
    }

    public List<AvailabilityDTO> getAvailability() {
        return availability;
    }

    public void setAvailability(List<AvailabilityDTO> availability) {
        this.availability = availability;
    }
}