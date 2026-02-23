package com.medibook.appointment.service;


import com.medibook.appointment.dto.TimeSlotDTO;
import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.repositories.AvailabilityRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AvailabilityService {
    private final AvailabilityRepository availabilityRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final AppointmentRepository appointmentRepository;

    public AvailabilityService(AvailabilityRepository availabilityRepository,
                               DoctorProfileRepository doctorProfileRepository, AppointmentRepository appointmentRepository ) {
        this.availabilityRepository = availabilityRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.appointmentRepository = appointmentRepository;

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
    public Optional<Availability> getAvailabilityById(int id) {
        return availabilityRepository.findById(id);
    }


    public List<TimeSlotDTO> getAvailableSlots(Long doctorId, LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();

        List<Availability> workingHours =
                availabilityRepository.findByDoctorIdAndDayOfWeek(doctorId, day);

        List<Appointment> bookedAppointments =
                appointmentRepository.findByDoctorIdAndDate(doctorId, date);

        List<TimeSlotDTO> availableSlots = new ArrayList<>();

        for (Availability availability : workingHours) {

            LocalTime current = availability.getStartTime();

            while (current.plusMinutes(30).isBefore(availability.getEndTime())
                    || current.plusMinutes(30).equals(availability.getEndTime())) {

                LocalTime slotEnd = current.plusMinutes(30);

                LocalTime finalCurrent = current;
                boolean isBooked = bookedAppointments.stream()
                        .anyMatch(appt -> appt.getTime().equals(finalCurrent));

                if (!isBooked) {
                    availableSlots.add(new TimeSlotDTO(current.toString(), slotEnd.toString()));
                }

                current = slotEnd;
            }
        }

        return availableSlots;
    }

}
