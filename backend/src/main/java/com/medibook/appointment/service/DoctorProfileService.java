package com.medibook.appointment.service;

import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.mapper.DoctorMapper;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorProfileService {
    DoctorProfileRepository doctorProfileRepository;

    DoctorMapper doctorMapper;

    public DoctorProfileService(DoctorProfileRepository doctorProfileRepository,  DoctorMapper doctorMapper) {
        this.doctorProfileRepository = doctorProfileRepository;
        this.doctorMapper = doctorMapper;
    }

    public Optional<Doctor_Profile> findDoctorProfileById(Long id) {
        return doctorProfileRepository.findById(id);
    }

    public List<Doctor_Profile> getDoctorProfiles() {
        return doctorProfileRepository.findAll();
    }

    public List<DoctorDTO> getDoctorsDTO() {
        List<Doctor_Profile> doctors = doctorProfileRepository.findAll();
        List<DoctorDTO> doctorDTOs = new ArrayList<>();
        for(Doctor_Profile doctor : doctors) {
            doctorDTOs.add(doctorMapper.toDTO(doctor));
        }
        return doctorDTOs;
    }
}
