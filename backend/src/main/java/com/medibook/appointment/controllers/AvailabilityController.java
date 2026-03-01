package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.AvailabilityDTO;
import com.medibook.appointment.dto.TimeSlotDTO;
import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.service.AvailabilityService;
import com.medibook.appointment.service.DoctorProfileService;
import com.medibook.appointment.service.UserDetailsImpl;
import com.medibook.appointment.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @PostMapping("/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<AvailabilityDTO> addAvailability(@PathVariable Long doctorId, @Valid @RequestBody AvailabilityDTO dto, Authentication authentication) {
        String email = ((UserDetailsImpl) authentication.getPrincipal()).getEmail();
        AvailabilityDTO created = availabilityService.addAvailability(doctorId, dto, email);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<List<AvailabilityDTO>> getDoctorAvailability(@PathVariable Long doctorId) {
        return ResponseEntity.ok(availabilityService.getDoctorAvailabilityDTOs(doctorId));
    }

    @GetMapping("/{doctorId}/slots")
    public ResponseEntity<List<TimeSlotDTO>> getSlots(@PathVariable Long doctorId, @RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date.trim());
        return ResponseEntity.ok(availabilityService.getAvailableSlots(doctorId, localDate));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Map<String, String>> deleteAvailability(@PathVariable int id, Authentication authentication) {
        String email = ((UserDetailsImpl) authentication.getPrincipal()).getEmail();
        availabilityService.deleteAvailability(id, email);
        return ResponseEntity.ok(Map.of("message", "Availability deleted successfully."));
    }
}

