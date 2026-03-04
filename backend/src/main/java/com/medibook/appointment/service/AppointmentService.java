package com.medibook.appointment.service;

import com.medibook.appointment.config.SecurityUtils;
import com.medibook.appointment.dto.AppointmentRequestDTO;
import com.medibook.appointment.dto.AppointmentResponseDTO;
import com.medibook.appointment.entities.*;
import com.medibook.appointment.mapper.AppointmentMapper;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final UserService userService;
    private final DoctorProfileService doctorProfileService;
    private final EmailService emailService;
    private final NotificationService notificationService;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,  AppointmentMapper appointmentMapper,  UserService userService, DoctorProfileService doctorProfileService, DoctorProfileRepository doctorProfileRepository, EmailService emailService, NotificationService notificationService)
    {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
        this.userService = userService;
        this.doctorProfileService = doctorProfileService;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    @Transactional
    public Appointment bookAppointment(AppointmentRequestDTO dto, String userEmail) {

        User user = userService.findUserByEmail(userEmail);

        Doctor_Profile doctor = doctorProfileService.findDoctorProfileById(dto.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        boolean exists = appointmentRepository.existsByDoctorAndDateAndTime(
                doctor,
                dto.getDate(),
                dto.getTime()
        );

        if (exists) {
            throw new IllegalStateException("This slot is already booked");
        }

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setDate(dto.getDate());
        appointment.setTime(dto.getTime());
        appointment.setDescription(dto.getDescription());
        appointment.setStatus(AppointmentStatus.PENDING);

        System.out.println("Appointment Saving");
        appointmentRepository.save(appointment);
        System.out.println("Appointment Saved");

        // Create Emails for patient and Doctor
        emailService.sendAppointmentConfirmationEmailPatient(
                userEmail,
                appointment.getDate().toString(),
                appointment.getTime().toString(),
                doctor.getUser().getLastName()
        );

        emailService.sendAppointmentConfirmationEmailDoctor(
                doctor.getUser().getEmail(),
                appointment.getDate().toString(),
                appointment.getTime().toString()
        );

        // Create doctor notification
        notificationService.createNotification(
                doctor.getUser(),
                "New pending appointment on "
                        + appointment.getDate() + " at "
                        + appointment.getTime()
                        + " from patient "
                        + user.getLastName()
        );

        return appointment;
    }

    public void updateAppointment(Long appointment_id, AppointmentRequestDTO newAppointment) {
        Optional<Appointment> optionalAppointment= appointmentRepository.findById(appointment_id);
        if(optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setDate(newAppointment.getDate());
            appointment.setDescription(newAppointment.getDescription());
            appointment.setTime(newAppointment.getTime());
            appointmentRepository.save(appointment);
        }
    }

    public List<AppointmentResponseDTO> getAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        // Map to DTOs
        List<AppointmentResponseDTO> dtos = appointments.stream()
                .map(this::getAppointmentResponseDTO)   // assuming you already have this method
                .toList();

        // Sort by date then time
        return dtos.stream()
                .sorted(Comparator
                        .comparing(AppointmentResponseDTO::getDate)
                        .thenComparing(AppointmentResponseDTO::getTime))
                .toList();
    }

    public Optional<Appointment> getAppointmentById(final Long appointment_id) {
        return  appointmentRepository.findById(appointment_id);
    }

    public List<Appointment> getAppointmentsByPatient(User user) {
        return appointmentRepository.findByUser(user);
    }

    public List<Appointment> getAppointmentsByDoctorProfile(Doctor_Profile doctor_profile) {
        return appointmentRepository.findByDoctor(doctor_profile);
    }

    @Transactional
    public boolean deleteAppointmentById(final Long appointment_id) {
        final Optional<Appointment> appointmentOptional = this.appointmentRepository.findById(appointment_id);
        if (appointmentOptional.isEmpty()) {
            return false;
        }
        Appointment appointment = appointmentOptional.get();
        emailService.sendAppointmentCancelationEmailDoctor(appointment.getDoctor().getUser().getEmail(), appointment.getDate().toString(), appointment.getTime().toString());
        emailService.sendAppointmentCancelationEmailPatient(appointment.getUser().getEmail(), appointment.getDate().toString(), appointment.getTime().toString(), appointment.getDoctor().getUser().getLastName());
        this.appointmentRepository.deleteById(appointment_id);
        return true;
    }

    @Transactional
    public List<AppointmentResponseDTO> getMyAppointments(String email) {

        User user = userService.findUserByEmail(email);

        List<Appointment> result = new ArrayList<>();

        // PATIENT
        if (SecurityUtils.hasRole(user, "ROLE_PATIENT") && user.getPatientProfile() != null) {
            result.addAll(getAppointmentsByPatient(user));
        }

        // DOCTOR
        if (SecurityUtils.hasRole(user, "ROLE_DOCTOR") && user.getDoctorProfile() != null) {
            result.addAll(getAppointmentsByDoctorProfile(user.getDoctorProfile()));
        }

        // ADMIN
        if (SecurityUtils.hasRole(user, "ROLE_ADMIN")) {
            result = appointmentRepository.findAll();
        }

        // Map to DTOs
        List<AppointmentResponseDTO> dtos = result.stream()
                .map(this::getAppointmentResponseDTO)   // assuming you already have this method
                .toList();

        // Sort by date then time
        return dtos.stream()
                .sorted(Comparator
                        .comparing(AppointmentResponseDTO::getDate)
                        .thenComparing(AppointmentResponseDTO::getTime))
                .toList();
    }

    public AppointmentResponseDTO getAppointmentResponseDTO(Appointment appointment) {
        return appointmentMapper.toDTO(appointment);
    }

    public List<AppointmentResponseDTO> getAppointmentsForDoctorOnDate(Long doctorId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsForDoctorOnDate(doctorId, date);
        return appointments.stream()
                .map(a -> new AppointmentResponseDTO(
                        a.getDate().toString(),
                        a.getTime().toString(),
                        a.getStatus(),
                        a.getDescription(),
                        a.getDoctor().getUser().getFirstName(),
                        a.getUser().getFirstName()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));


        // Optional but recommended: ensure only the patient who booked can cancel
        User patient = userService.findUserByEmail(appointment.getUser().getEmail());
        if (!appointment.getUser().getId().equals(patient.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("You cannot cancel this appointment.");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        User doctorUser = appointment.getDoctor().getUser();

        // Notification to doctor
        String msg = "Patient " + patient.getFirstName() + " " + patient.getLastName()
                + " cancelled the appointment on " + appointment.getDate()
                + " at " + appointment.getTime() + ".";

        notificationService.createNotification(doctorUser, msg);

        // Email to doctor
        emailService.sendAppointmentCancelationEmailDoctor(
                doctorUser.getEmail(),
                appointment.getDate().toString(),
                appointment.getTime().toString()
        );
    }

    @Transactional
    public void confirmAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        String patientEmail = appointment.getUser().getEmail();

        // Ensure only the patient who booked can cancel
        User patient = userService.findUserByEmail(patientEmail);
        if (!appointment.getUser().getId().equals(patient.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("You cannot cancel this appointment.");
        }

        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);

        User doctorUser = appointment.getDoctor().getUser();

        // Notification to Patient
        String msg = "Patient " + doctorUser.getUsername()
                + " confirmed the appointment on " + appointment.getDate()
                + " at " + appointment.getTime() + ".";

        notificationService.createNotification(doctorUser, msg);

        // Email to patient
        emailService.sendAppointmentConfirmationbyDoctor(patientEmail, appointment.getDate().toString(), appointment.getTime().toString(), appointment.getDoctor().getUser().getLastName());
    }


}
