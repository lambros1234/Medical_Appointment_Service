package com.medibook.appointment.dto;

public class AvailabilityDTO {
    private Long id;
    private String dayOfWeek;   // e.g. MONDAY
    private String startTime;   // "09:00"
    private String endTime;     // "12:00"

    public AvailabilityDTO() {}

    public AvailabilityDTO(String dayOfWeek, String startTime, String endTime,  Long id) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.id = id;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
