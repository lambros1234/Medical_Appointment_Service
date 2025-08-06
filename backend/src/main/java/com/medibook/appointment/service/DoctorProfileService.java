package com.medibook.appointment.service;

import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.mapper.DoctorMapper;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorProfileService {
    private final DoctorProfileRepository doctorProfileRepository;
    private final DoctorMapper doctorMapper;


    public DoctorProfileService(DoctorProfileRepository doctorProfileRepository, DoctorMapper doctorMapper) {
        this.doctorProfileRepository = doctorProfileRepository;
        this.doctorMapper = doctorMapper;
    }

    public Optional<Doctor_Profile> findDoctorProfileById(Long id) {
        return doctorProfileRepository.findById(id);
    }

    public List<Doctor_Profile> getDoctors() {
        return  doctorProfileRepository.findAll();
    }

    public List<DoctorDTO> getDoctorsDTO(List<Doctor_Profile> doctors) {
        return doctorMapper.toDTOList(doctors);
    }

    public DoctorDTO getDoctorDTO(Doctor_Profile doctor) {
        return doctorMapper.toDTO(doctor);
    }
}
