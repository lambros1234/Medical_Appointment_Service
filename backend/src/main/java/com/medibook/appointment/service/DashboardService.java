package com.medibook.appointment.service;

import com.medibook.appointment.dto.AdminDashboardStatsDTO;
import com.medibook.appointment.dto.DoctorDashboardStatsDTO;
import com.medibook.appointment.dto.PatientDashboardStatsDTO;
import com.medibook.appointment.entities.AppointmentStatus;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import com.medibook.appointment.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final UserRepository userRepository;


    public DashboardService(AppointmentRepository appointmentRepository, DoctorProfileRepository doctorProfileRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.userRepository = userRepository;
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

    public AdminDashboardStatsDTO getAdminStats(User admin) {

        long totalUsers = userRepository.count();

        long totalDoctors =
                userRepository.countByRoles_Name("ROLE_DOCTOR");

        long pendingDoctors =
                userRepository.countByRoles_NameAndEnabledFalse("ROLE_DOCTOR");

        long totalAppointments =
                appointmentRepository.count();

        return new AdminDashboardStatsDTO(
                totalUsers,
                totalDoctors,
                pendingDoctors,
                totalAppointments
        );
    }


    public List<Map<String, Object>> getAppointmentsPerMonth() {

        List<Object[]> results = appointmentRepository.countAppointmentsPerMonth();

        List<Map<String, Object>> data = new ArrayList<>();

        String[] months = {
                "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        };

        for (Object[] row : results) {

            int monthNumber = ((Number) row[0]).intValue();
            long count = ((Number) row[1]).longValue();

            Map<String, Object> entry = new HashMap<>();
            entry.put("month", months[monthNumber]);
            entry.put("appointments", count);

            data.add(entry);
        }

        return data;
    }
}
