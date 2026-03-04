package com.medibook.appointment.dto;

public class PatientDashboardStatsDTO {
    private long upcomingAppointments;
    private long completedAppointments;
    private long pendingAppointments;

    public PatientDashboardStatsDTO(long upcomingAppointments, long completedAppointments, long pendingAppointments) {
        this.upcomingAppointments = upcomingAppointments;
        this.completedAppointments = completedAppointments;
        this.pendingAppointments = pendingAppointments;
    }

    public long getCompletedAppointments() {
        return completedAppointments;
    }

    public void setCompletedAppointments(long completedAppointments) {
        this.completedAppointments = completedAppointments;
    }

    public long getPendingAppointments() {
        return pendingAppointments;
    }

    public void setPendingAppointments(long pendingAppointments) {
        this.pendingAppointments = pendingAppointments;
    }

    public long getUpcomingAppointments() {
        return upcomingAppointments;
    }

    public void setUpcomingAppointments(long upcomingAppointments) {
        this.upcomingAppointments = upcomingAppointments;
    }
}
