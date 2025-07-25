package com.medibook.appointment.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "phone")
        })
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @Column(length = 20, nullable = true)
    private String address;

    @Column(length = 15, unique = true, nullable = true)
    private String phone;

    private boolean enabled = false;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();  // DOCTOR, PATIENT, ADMIN

    @OneToOne(mappedBy = "doctor")
    private Doctor_Profile doctorProfile;

    @OneToOne(mappedBy = "patient")
    private Patient_Profile patientProfile;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Appointment> appointments;

    public User() {}

    public User(Long id, String username, String email, String password, String address, String phone, boolean enabled, Set<Role> roles, Doctor_Profile doctorProfile, Patient_Profile patientProfile, List<Appointment> appointments) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.enabled = enabled;
        this.roles = roles;
        this.doctorProfile = doctorProfile;
        this.patientProfile = patientProfile;
        this.appointments = appointments;
    }

    public User(String username, String email, String encode) {
        this.username = username;
        this.email = email;
        this.password = encode;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public Doctor_Profile getDoctor_profile() {
        return doctorProfile;
    }

    public void setDoctor_profile(Doctor_Profile doctor_profile) {
        this.doctorProfile = doctor_profile;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Doctor_Profile getDoctorProfile() {
        return doctorProfile;
    }

    public void setDoctorProfile(Doctor_Profile doctorProfile) {
        this.doctorProfile = doctorProfile;
    }

    public Patient_Profile getPatientProfile() {
        return patientProfile;
    }

    public void setPatientProfile(Patient_Profile patientProfile) {
        this.patientProfile = patientProfile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return username;
    }
}
