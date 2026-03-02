package com.medibook.appointment.controllers;

import com.medibook.appointment.dto.DoctorDashboardStatsDTO;
import com.medibook.appointment.dto.PatientDashboardStatsDTO;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.UserRepository;
import com.medibook.appointment.service.DashboardService;
import com.medibook.appointment.service.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    public DashboardController(DashboardService dashboardService, UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    @GetMapping("/doctor")
    public DoctorDashboardStatsDTO getDoctorDashboard(Authentication authentication) {
        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User doctor = userRepository
                .findById(userDetails.getId())
                .orElseThrow();

        return dashboardService.getDoctorStats(doctor);
    }

    @GetMapping("/patient")
    public PatientDashboardStatsDTO getPatientDashboard(Authentication authentication) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        User patient = userRepository
                .findById(userDetails.getId())
                .orElseThrow();

        return dashboardService.getPatientStats(patient);
    }

    // Needs to be completed
    @GetMapping("/admin")
    public void getAdminDashboard(Authentication authentication) {
    }

}
