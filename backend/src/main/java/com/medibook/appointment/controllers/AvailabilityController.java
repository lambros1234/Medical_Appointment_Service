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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    private AvailabilityService availabilityService;
    private DoctorProfileService doctorProfileService;
    private UserService userService;

    public AvailabilityController(AvailabilityService availabilityService, DoctorProfileService doctorProfileService, UserService userService) {
        this.availabilityService = availabilityService;
        this.doctorProfileService = doctorProfileService;
        this.userService = userService;
    }

    @PostMapping("/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR')")
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
        System.out.println(availabilities);
        List<AvailabilityDTO> dtos = availabilities.stream()
                .map(this::mapToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{doctorId}/slots")
    public ResponseEntity<List<TimeSlotDTO>> getSlots(
            @PathVariable Long doctorId,
            @RequestParam String date) {

        LocalDate localDate = LocalDate.parse(date);

        List<TimeSlotDTO> slots =
                availabilityService.getAvailableSlots(doctorId, localDate);

        return ResponseEntity.ok(slots);
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAvailability(@PathVariable int id,
                                                Authentication authentication) {
        try {

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userService.findUserByEmail(userDetails.getEmail());

            Doctor_Profile doctorProfile = user.getDoctor_profile();

            if (doctorProfile == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Doctor profile not found.");
            }

            Optional<Availability> optionalAvailability =
                    availabilityService.getAvailabilityById(id);

            if (optionalAvailability.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Availability not found.");
            }

            Availability availability = optionalAvailability.get();

            // Security check: ensure doctor owns this availability
            if (!availability.getDoctor().getId().equals(doctorProfile.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not allowed to delete this availability.");
            }

            availabilityService.deleteAvailability(id);

            return ResponseEntity.ok("Availability deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete availability.");
        }
    }

    private AvailabilityDTO mapToDTO(Availability a) {
        AvailabilityDTO dto = new AvailabilityDTO();

        dto.setId(a.getId());
        dto.setDayOfWeek(a.getDayOfWeek().toString());
        dto.setStartTime(a.getStartTime().toString());
        dto.setEndTime(a.getEndTime().toString());

        return dto;
    }
}
