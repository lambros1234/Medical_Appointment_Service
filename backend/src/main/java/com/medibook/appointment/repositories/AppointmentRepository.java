package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Appointment;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.Patient_Profile;
import com.medibook.appointment.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDoctor(Doctor_Profile doctor_profile);
}
