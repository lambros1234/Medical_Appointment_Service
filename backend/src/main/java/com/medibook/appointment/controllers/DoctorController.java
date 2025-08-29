package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.service.DoctorProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
    private DoctorProfileService doctorProfileService;

    public DoctorController(DoctorProfileService doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }

    @GetMapping
    public List<DoctorDTO> getDoctors() {
        return doctorProfileService.getDoctorsDTO();
    }
}
