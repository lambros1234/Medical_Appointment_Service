package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Availability;
import com.medibook.appointment.entities.Doctor_Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {
    List<Availability> findByDoctor(Doctor_Profile doctor);
    boolean existsByDoctorAndDayOfWeekAndStartTimeAndEndTime(
            Doctor_Profile doctor, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime
    );

}
