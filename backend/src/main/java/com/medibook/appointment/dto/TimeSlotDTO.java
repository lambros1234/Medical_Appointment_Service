package com.medibook.appointment.dto;

public class TimeSlotDTO {

    private String startTime;
    private String endTime;

    public TimeSlotDTO(String startTime, String endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
}
