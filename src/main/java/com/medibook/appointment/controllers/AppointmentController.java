package com.medibook.appointment.controllers;


import com.medibook.appointment.config.SecurityUtils;
import com.medibook.appointment.dto.AppointmentRequestDTO;
import com.medibook.appointment.dto.AppointmentResponseDTO;
import com.medibook.appointment.entities.*;
import com.medibook.appointment.service.AppointmentService;
import com.medibook.appointment.service.DoctorProfileService;
import com.medibook.appointment.service.UserDetailsImpl;
import com.medibook.appointment.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {


    private final UserService userService;
    private final AppointmentService appointmentService;
    private final DoctorProfileService  doctorProfileService;


    public AppointmentController(AppointmentService appointmentService, UserService userService, DoctorProfileService doctorProfileService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.doctorProfileService = doctorProfileService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyAppointments(Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userService.findUserByEmail(userDetails.getEmail());

            List<AppointmentResponseDTO> appointments = new ArrayList<>();

            if (SecurityUtils.hasRole(user, "ROLE_PATIENT") && user.getPatientProfile() != null) {
                List<Appointment> patientAppointments = appointmentService
                        .getAppointmentsByPatient(user.getPatientProfile().getPatient());
                for (Appointment appointment : patientAppointments) {
                    appointments.add(appointmentService.getAppointmentResponseDTO(appointment));
                }
            }

            if (SecurityUtils.hasRole(user, "ROLE_DOCTOR") && user.getDoctor_profile() != null) {
                List<Appointment> doctorAppointments = appointmentService
                        .getAppointmentsByDoctorProfile(user.getDoctor_profile());
                for (Appointment appointment : doctorAppointments) {
                    appointments.add(appointmentService.getAppointmentResponseDTO(appointment));
                }
            }

            if(SecurityUtils.hasRole(user, "ROLE_ADMIN")) {
                List<Appointment> allAppointments = appointmentService.getAppointments();
                for(Appointment appointment : allAppointments) {
                    appointments.add(appointmentService.getAppointmentResponseDTO(appointment));
                }
            }

            return ResponseEntity.ok(appointments);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch appointments.");
        }
    }


    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentRequestDTO dto,
                                                    Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userService.findUserByEmail(userDetails.getEmail());

            System.out.println("Received doctor ID: " + dto.getDoctorId());

            Optional<Doctor_Profile> optionalDoctor = doctorProfileService.findDoctorProfileById(dto.getDoctorId());
            if (optionalDoctor.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctor not found.");
            }

            Appointment appointment = new Appointment();
            appointment.setUser(user);
            appointment.setDoctor(optionalDoctor.get());
            appointment.setDate(dto.getDate());
            appointment.setTime(dto.getTime());
            appointment.setDescription(dto.getDescription());
            appointment.setStatus(AppointmentStatus.PENDING); // default

            appointmentService.saveAppointment(appointment);

            return ResponseEntity.status(HttpStatus.CREATED).body("Appointment created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create appointment: " + e.getMessage());
        }
    }


    @GetMapping("/{appointment_id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointment(@PathVariable Long appointment_id) {

        Optional<Appointment> optionalAppointment= appointmentService.getAppointmentById(appointment_id);
        if(optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            AppointmentResponseDTO  appointmentResponseDTO = appointmentService.getAppointmentResponseDTO(appointment);
            return  ResponseEntity.ok(appointmentResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{appointment_id}")
    public ResponseEntity<String> updateAppointment(@PathVariable Long appointment_id, @RequestBody AppointmentRequestDTO newAppointment) {
        Optional<Appointment> optionalAppointment= appointmentService.getAppointmentById(appointment_id);
        if(optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setDate(newAppointment.getDate());
            appointment.setDescription(newAppointment.getDescription());
            appointment.setTime(newAppointment.getTime());
            appointmentService.updateAppointment(appointment);
            return ResponseEntity.ok("Appointment updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found.");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{appointment_id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long appointment_id) {
        Optional<Appointment> optionalAppointment= appointmentService.getAppointmentById(appointment_id);
        if(optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointmentService.deleteAppointmentById(appointment_id);
            return ResponseEntity.ok("Appointment deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }


    // Optional: Filtering


}
