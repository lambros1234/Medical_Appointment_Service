package com.medibook.appointment.service;


import com.medibook.appointment.dto.AvailabilityDTO;
import com.medibook.appointment.dto.TimeSlotDTO;
import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.AppointmentRepository;
import com.medibook.appointment.repositories.AvailabilityRepository;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import jakarta.transaction.Transactional;
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
    private final UserService userService;
    private final DoctorProfileService doctorProfileService;

    public AvailabilityService(AvailabilityRepository availabilityRepository,
                               DoctorProfileRepository doctorProfileRepository, AppointmentRepository appointmentRepository, UserService userService, DoctorProfileService doctorProfileService) {
        this.availabilityRepository = availabilityRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
        this.doctorProfileService = doctorProfileService;

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
    @Transactional
    public AvailabilityDTO addAvailability(Long doctorId, AvailabilityDTO dto, String doctorEmail) {

        User doctorUser = userService.findUserByEmail(doctorEmail);
        Doctor_Profile myProfile = doctorUser.getDoctor_profile();

        if (myProfile == null) {
            throw new org.springframework.security.access.AccessDeniedException("Doctor profile not found.");
        }

        if (!myProfile.getId().equals(doctorId)) {
            throw new org.springframework.security.access.AccessDeniedException("You cannot add availability for another doctor.");
        }

        Doctor_Profile doctorProfile = doctorProfileService.findDoctorProfileById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        Availability created = addAvailability(
                doctorProfile,
                DayOfWeek.valueOf(dto.getDayOfWeek().toUpperCase()),
                LocalTime.parse(dto.getStartTime()),
                LocalTime.parse(dto.getEndTime())
        );

        return mapToDTO(created);
    }

    @Transactional
    public List<AvailabilityDTO> getDoctorAvailabilityDTOs(Long doctorId) {
        return getDoctorAvailability(doctorId).stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional
    public void deleteAvailability(int id, String doctorEmail) {

        User doctorUser = userService.findUserByEmail(doctorEmail);
        Doctor_Profile myProfile = doctorUser.getDoctor_profile();

        if (myProfile == null) {
            throw new org.springframework.security.access.AccessDeniedException("Doctor profile not found.");
        }

        Availability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Availability not found."));

        if (!availability.getDoctor().getId().equals(myProfile.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("You are not allowed to delete this availability.");
        }

        availabilityRepository.deleteById(id);
    }

    private AvailabilityDTO mapToDTO(Availability a) {
        AvailabilityDTO dto = new AvailabilityDTO();
        dto.setId(a.getId());
        dto.setDayOfWeek(a.getDayOfWeek().toString());
        dto.setStartTime(a.getStartTime().toString());
        dto.setEndTime(a.getEndTime().toString());
        return dto;
    }
}
