package com.medibook.appointment.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Patient_Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User patient;

    private LocalDate birthDate;

    @Column(nullable = true)
    private String gender;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    @ManyToMany
    @JoinTable(
            name = "patient_allergies",
            joinColumns = @JoinColumn(name = "patient_profile_id"),
            inverseJoinColumns = @JoinColumn(name = "allergy_id")
    )
    private List<Allergy> allergies;

    public Patient_Profile(List<Allergy> allergies, LocalDate birthDate, BloodType bloodType, String gender, User patient, int id) {
        this.allergies = allergies;
        this.birthDate = birthDate;
        this.bloodType = bloodType;
        this.gender = gender;
        this.patient = patient;
        this.id = id;
    }
    public Patient_Profile() {}

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<Allergy> allergies) {
        this.allergies = allergies;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public BloodType getBloodType() {
        return bloodType;
    }

    public void setBloodType(BloodType bloodType) {
        this.bloodType = bloodType;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getPatient() {
        return patient;
    }

    public void setPatient(User patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "Patient_Profile{" +
                "allergies=" + allergies +
                ", id=" + id +
                ", patient=" + patient +
                ", birthDate=" + birthDate +
                ", gender='" + gender + '\'' +
                ", bloodType=" + bloodType +
                '}';
    }
}
