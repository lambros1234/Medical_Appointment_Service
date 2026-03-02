package com.medibook.appointment.service;

import com.medibook.appointment.dto.DoctorDashboardStatsDTO;
import com.medibook.appointment.dto.PatientDashboardStatsDTO;
import com.medibook.appointment.entities.AppointmentStatus;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorProfileRepository doctorProfileRepository;


    public DashboardService(AppointmentRepository appointmentRepository, DoctorProfileRepository doctorProfileRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorProfileRepository = doctorProfileRepository;
    }

    public DoctorDashboardStatsDTO getDoctorStats(User doctorUser) {

        Doctor_Profile doctorProfile = doctorProfileRepository
                .findByDoctor(doctorUser)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

        long total = appointmentRepository.countByDoctor(doctorProfile);

        long pending = appointmentRepository
                .countByDoctorAndStatus(doctorProfile, AppointmentStatus.PENDING);

        long confirmed = appointmentRepository
                .countByDoctorAndStatus(doctorProfile, AppointmentStatus.CONFIRMED);

        LocalDate today = LocalDate.now();

        long todayCount = appointmentRepository
                .countByDoctorAndDate(doctorProfile, today);

        return new DoctorDashboardStatsDTO(
                total,
                pending,
                confirmed,
                todayCount
        );
    }

    public PatientDashboardStatsDTO getPatientStats(User patient) {

        long upcoming = appointmentRepository
                .countByUserAndDateAfter(patient, LocalDate.now());

        long completed = appointmentRepository
                .countByUserAndStatus(patient, AppointmentStatus.COMPLETED);

        long pending = appointmentRepository
                .countByUserAndStatus(patient, AppointmentStatus.PENDING);

        return new PatientDashboardStatsDTO(
                upcoming,
                completed,
                pending
        );
    }
}
