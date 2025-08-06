package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorProfileRepository extends JpaRepository<Doctor_Profile, Long> {
    public Optional<Doctor_Profile> findDoctorProfileById(Long id);
}
