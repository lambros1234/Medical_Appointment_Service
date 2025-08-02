package com.medibook.appointment.repositories;

import com.medibook.appointment.entities.Patient_Profile;
import org.springframework.data.repository.CrudRepository;

public interface PatientProfileRepository extends CrudRepository<Patient_Profile, Long> {
}
