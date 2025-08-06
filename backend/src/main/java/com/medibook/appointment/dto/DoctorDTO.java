package com.medibook.appointment.dto;

import java.util.List;

public class DoctorDTO {

    private Long id;
    private String username;
    private String phone;
    private String email;
    private List<String> specialties;

    public DoctorDTO(Long id, String username, String phone, String email, List<String> specialties) {
        this.id = id;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.specialties = specialties;
    }

    public DoctorDTO() {}

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<String> specialties) {
        this.specialties = specialties;
    }
}
