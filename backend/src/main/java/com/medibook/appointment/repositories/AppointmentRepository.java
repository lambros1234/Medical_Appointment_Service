package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.Patient_Profile;
import com.medibook.appointment.entities.User;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDoctor(Doctor_Profile doctor_profile);
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.date = :date")
    List<Appointment> findAppointmentsForDoctorOnDate(@Param("doctorId") Long doctorId,
                                                      @Param("date") LocalDate date);
}
