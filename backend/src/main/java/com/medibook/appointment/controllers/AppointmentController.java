package com.medibook.appointment.controllers;

import com.medibook.appointment.config.SecurityUtils;
import com.medibook.appointment.dto.AppointmentRequestDTO;
import com.medibook.appointment.dto.AppointmentResponseDTO;
import com.medibook.appointment.entities.*;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.service.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentRepository appointmentRepository;


    public AppointmentController(AppointmentService appointmentService, AppointmentRepository appointmentRepository) {
        this.appointmentService = appointmentService;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponseDTO>> getMyAppointments(Authentication authentication) {
        String email = ((UserDetailsImpl) authentication.getPrincipal()).getEmail();
        return ResponseEntity.ok(appointmentService.getMyAppointments(email));
    }

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequestDTO dto, Authentication authentication) {
        String email = ((UserDetailsImpl) authentication.getPrincipal()).getEmail();
        Appointment created = appointmentService.bookAppointment(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{appointment_id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointment(@PathVariable Long appointment_id) {
        return ResponseEntity.ok(appointmentService.getAppointmentResponseDTO(appointmentRepository.findById(appointment_id).get()));
    }

    @PutMapping("/{appointment_id}")
    public ResponseEntity<Map<String, String>> updateAppointment(@PathVariable Long appointment_id, @Valid @RequestBody AppointmentRequestDTO dto) {
        appointmentService.updateAppointment(appointment_id, dto);
        return ResponseEntity.ok(Map.of("message", "Appointment updated successfully!"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{appointment_id}")
    public ResponseEntity<Map<String, String>> deleteAppointment(@PathVariable Long appointment_id) {
        appointmentService.deleteAppointmentById(appointment_id);
        return ResponseEntity.ok(Map.of("message", "Appointment deleted successfully!"));
    }

    @PatchMapping("/cancel/{appointment_id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointment_id, Authentication authentication) {
        appointmentService.cancelAppointment(appointment_id);
        return ResponseEntity.ok("Appointment cancelled.");
    }

    @PatchMapping("/confirm/{appointment_id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> confirmAppointment(@PathVariable Long appointment_id) {
        appointmentService.confirmAppointment(appointment_id);
        return ResponseEntity.ok("Appointment confirmed.");
    }

    @GetMapping("/doctor/{doctor_id}")
    public List<AppointmentResponseDTO> getAllAppointments(@PathVariable("doctor_id") Long doctorId, @RequestParam String date) {
        LocalDate parsedDate = LocalDate.parse(date.trim()); // remove any extra spaces/newlines
        return appointmentService.getAppointmentsForDoctorOnDate(doctorId, parsedDate);
    }


    // Optional: Filtering


}
