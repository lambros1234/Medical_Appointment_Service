package com.medibook.appointment.dto;

public class AdminDashboardStatsDTO {
    private long totalUsers;
    private long totalDoctors;
    private long pendingDoctors;
    private long totalAppointments;

    public AdminDashboardStatsDTO(long totalUsers, long totalDoctors, long pendingDoctors, long totalAppointments) {
        this.pendingDoctors = pendingDoctors;
        this.totalDoctors = totalDoctors;
        this.totalUsers = totalUsers;
        this.totalAppointments = totalAppointments;
    }

    public long getPendingDoctors() {
        return pendingDoctors;
    }

    public void setPendingDoctors(long pendingDoctors) {
        this.pendingDoctors = pendingDoctors;
    }

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
    public long getTotalAppointments() {
        return totalAppointments;
    }
    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }
}
