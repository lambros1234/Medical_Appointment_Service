package com.medibook.appointment.service;


import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.repositories.AvailabilityRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Service
public class AvailabilityService {
    private final AvailabilityRepository availabilityRepository;
    private final DoctorProfileRepository doctorProfileRepository;

    public AvailabilityService(AvailabilityRepository availabilityRepository,
                               DoctorProfileRepository doctorProfileRepository) {
        this.availabilityRepository = availabilityRepository;
        this.doctorProfileRepository = doctorProfileRepository;
    }

    public Availability addAvailability(Doctor_Profile doctor, DayOfWeek day, LocalTime start, LocalTime end) {
        boolean exists = availabilityRepository.existsByDoctorAndDayOfWeekAndStartTimeAndEndTime(doctor, day, start, end);
        if (exists) {
            throw new IllegalArgumentException("This availability already exists for the doctor.");
        }

        Availability availability = new Availability();
        availability.setDoctor(doctor);
        availability.setDayOfWeek(day);
        availability.setStartTime(start);
        availability.setEndTime(end);

        return availabilityRepository.save(availability);
    }


    public List<Availability> getDoctorAvailability(Long doctorId) {
        Doctor_Profile doctor = doctorProfileRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return availabilityRepository.findByDoctor(doctor);
    }

    public void deleteAvailability(int id) {
        availabilityRepository.deleteById(id);
    }
}
