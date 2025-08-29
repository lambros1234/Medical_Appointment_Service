package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.AvailabilityDTO;
import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.service.AvailabilityService;
import com.medibook.appointment.service.DoctorProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    private AvailabilityService availabilityService;
    private DoctorProfileService doctorProfileService;

    public AvailabilityController(AvailabilityService availabilityService,  DoctorProfileService doctorProfileService) {
        this.availabilityService = availabilityService;
        this.doctorProfileService = doctorProfileService;
    }

    @PostMapping("/{doctorId}")
    public ResponseEntity<AvailabilityDTO> addAvailability(
            @PathVariable Long doctorId,
            @RequestBody AvailabilityDTO dto) {

        Availability availability = availabilityService.addAvailability(
                doctorProfileService.findDoctorProfileById(doctorId).get(),
                DayOfWeek.valueOf(dto.getDayOfWeek().toUpperCase()),
                LocalTime.parse(dto.getStartTime()),
                LocalTime.parse(dto.getEndTime())
        );

        AvailabilityDTO response = mapToDTO(availability);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<List<AvailabilityDTO>> getDoctorAvailability(@PathVariable Long doctorId) {
        List<Availability> availabilities = availabilityService.getDoctorAvailability(doctorId);
        List<AvailabilityDTO> dtos = availabilities.stream()
                .map(this::mapToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }



    // Helper mapper
    private AvailabilityDTO mapToDTO(Availability a) {
        AvailabilityDTO dto = new AvailabilityDTO();
        dto.setDayOfWeek(a.getDayOfWeek().toString());
        dto.setStartTime(a.getStartTime().toString());
        dto.setEndTime(a.getEndTime().toString());
        return dto;
    }
}
