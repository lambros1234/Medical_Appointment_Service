package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.*;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDoctor(Doctor_Profile doctor_profile);
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.date = :date")
    List<Appointment> findAppointmentsForDoctorOnDate(@Param("doctorId") Long doctorId,
                                                      @Param("date") LocalDate date);
    List<Appointment> findByDoctorIdAndDate(Long doctorId, LocalDate date);
    boolean existsByDoctorAndDateAndTime(Doctor_Profile doctor, LocalDate date, LocalTime time);

    long countByDoctor(Doctor_Profile doctor);
    long countByDoctorAndStatus(Doctor_Profile doctor, AppointmentStatus status);
    long countByDoctorAndDate(Doctor_Profile doctor, LocalDate date);

    long countByUser(User user);
    long countByUserAndStatus(User user, AppointmentStatus status);
    long countByUserAndDateAfter(User user, LocalDate date);


    @Query("""
        SELECT MONTH(a.date) as month, COUNT(a) as count
        FROM Appointment a
        GROUP BY MONTH(a.date)
        ORDER BY MONTH(a.date)
     """)
    List<Object[]> countAppointmentsPerMonth();
}
