package com.medibook.appointment.dto;

public class DoctorDashboardStatsDTO {

    private long totalAppointments;
    private long pendingAppointments;
    private long confirmedAppointments;
    private long todayAppointments;

    public DoctorDashboardStatsDTO(long totalAppointments,
                                   long pendingAppointments,
                                   long confirmedAppointments,
                                   long todayAppointments) {
        this.totalAppointments = totalAppointments;
        this.pendingAppointments = pendingAppointments;
        this.confirmedAppointments = confirmedAppointments;
        this.todayAppointments = todayAppointments;
    }



    public long getConfirmedAppointments() {
        return confirmedAppointments;
    }

    public void setConfirmedAppointments(long confirmedAppointments) {
        this.confirmedAppointments = confirmedAppointments;
    }

    public long getPendingAppointments() {
        return pendingAppointments;
    }

    public void setPendingAppointments(long pendingAppointments) {
        this.pendingAppointments = pendingAppointments;
    }

    public long getTodayAppointments() {
        return todayAppointments;
    }

    public void setTodayAppointments(long todayAppointments) {
        this.todayAppointments = todayAppointments;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }
}
