package com.medibook.appointment.service;

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

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,  AppointmentMapper appointmentMapper,  UserService userService, DoctorProfileService doctorProfileService, DoctorProfileRepository doctorProfileRepository, EmailService emailService) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
        this.userService = userService;
        this.doctorProfileService = doctorProfileService;
        this.emailService = emailService;
    }

    public Appointment createAppointment(AppointmentRequestDTO dto, String userEmail) {
        User user = userService.findUserByEmail(userEmail);

        Doctor_Profile doctor = doctorProfileService.findDoctorProfileById(dto.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setDate(dto.getDate());
        appointment.setTime(dto.getTime());
        appointment.setDescription(dto.getDescription());
        appointment.setStatus(AppointmentStatus.PENDING);

        return appointmentRepository.save(appointment);
    }

    public void updateAppointment(final Appointment appointment) {

        this.appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
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
    public void saveAppointment(Appointment appointment, String userEmail) {
        this.appointmentRepository.save(appointment);
        emailService.sendAppointmentConfirmationEmailPatient(userEmail, appointment.getDate().toString(), appointment.getTime().toString(), appointment.getDoctor().getUser().getLastName());
        emailService.sendAppointmentConfirmationEmailDoctor(appointment.getDoctor().getUser().getEmail(), appointment.getDate().toString(), appointment.getTime().toString());
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



}
