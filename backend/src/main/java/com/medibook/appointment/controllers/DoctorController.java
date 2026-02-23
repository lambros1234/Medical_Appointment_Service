package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.AvailabilityDTO;
import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.dto.DoctorFullDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.service.AvailabilityService;
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
    private AvailabilityService availabilityService;

    public DoctorController(DoctorProfileService doctorProfileService,  AvailabilityService availabilityService) {
        this.doctorProfileService = doctorProfileService;
        this.availabilityService = availabilityService;
    }

    @GetMapping
    public List<DoctorDTO> getDoctors() {
        return doctorProfileService.getDoctorsDTO();
    }

    @GetMapping("/full")
    public ResponseEntity<List<DoctorFullDTO>> getDoctorsFull() {

        List<Doctor_Profile> doctors = doctorProfileService.getDoctorProfiles();

        List<DoctorFullDTO> result = doctors.stream().map(doc -> {

            DoctorFullDTO dto = new DoctorFullDTO();

            dto.setId(doc.getId());
            dto.setUsername(doc.getUser().getUsername());
            dto.setLocation(doc.getUser().getAddress());

            dto.setSpecialties(
                    doc.getSpecialties().stream()
                            .map(s -> s.getName())
                            .toList()
            );

            dto.setAvailability(
                    availabilityService.getDoctorAvailability(doc.getId())
                            .stream()
                            .map(a -> {
                                AvailabilityDTO adto = new AvailabilityDTO();
                                adto.setDayOfWeek(a.getDayOfWeek().toString());
                                adto.setStartTime(a.getStartTime().toString());
                                adto.setEndTime(a.getEndTime().toString());
                                return adto;
                            })
                            .toList()
            );

            return dto;

        }).toList();

        return ResponseEntity.ok(result);
    }
}
