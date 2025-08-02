package com.medibook.appointment.service;

import com.medibook.appointment.dto.AppointmentResponseDTO;
import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.Patient_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.mapper.AppointmentMapper;
import com.medibook.appointment.repositories.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,  AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
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
        this.appointmentRepository.deleteById(appointment_id);
        return true;
    }

    @Transactional
    public void saveAppointment(final Appointment appointment) {
        this.appointmentRepository.save(appointment);
    }

    public AppointmentResponseDTO getAppointmentResponseDTO(Appointment appointment) {
        return appointmentMapper.toDTO(appointment);
    }



}
