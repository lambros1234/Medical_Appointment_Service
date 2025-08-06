package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.service.DoctorProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorProfileService doctorProfileService;

    public DoctorController(DoctorProfileService doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }

    @GetMapping
    public List<DoctorDTO> getDoctors() {
        List<Doctor_Profile> doctors = doctorProfileService.getDoctors();
        return doctorProfileService.getDoctorsDTO(doctors);
    }

    @GetMapping("{doctor_id}")
    public ResponseEntity<DoctorDTO> getDoctor(@PathVariable("doctor_id") Long doctor_id) {
        Optional<Doctor_Profile> optionalDoctor = doctorProfileService.findDoctorProfileById(doctor_id);
        if (optionalDoctor.isPresent()) {
            Doctor_Profile doctor = optionalDoctor.get();
            return ResponseEntity.ok(doctorProfileService.getDoctorDTO(doctor));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
