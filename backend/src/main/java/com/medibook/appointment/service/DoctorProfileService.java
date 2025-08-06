package com.medibook.appointment.service;

import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorProfileService {
    DoctorProfileRepository doctorProfileRepository;

    public DoctorProfileService(DoctorProfileRepository doctorProfileRepository) {
        this.doctorProfileRepository = doctorProfileRepository;
    }

    public Optional<Doctor_Profile> findDoctorProfileById(Long id) {
        return doctorProfileRepository.findById(id);
    }
}
