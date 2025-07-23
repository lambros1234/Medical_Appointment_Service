package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Doctor_Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Doctor_ProfileRepository extends JpaRepository<Doctor_Profile, Long> {
}
