package com.medibook.appointment.service;


import com.medibook.appointment.dto.SpecialtyDTO;
import com.medibook.appointment.entities.Specialty;
import com.medibook.appointment.mapper.SpecialtyMapper;
import com.medibook.appointment.repositories.SpecialtyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpecialtyService {

    private SpecialtyRepository specialtyRepository;
    private SpecialtyMapper specialtyMapper;

    public SpecialtyService(SpecialtyRepository specialtyRepository,  SpecialtyMapper specialtyMapper) {
        this.specialtyRepository = specialtyRepository;
        this.specialtyMapper = specialtyMapper;
    }

    @Transactional
    public void saveSpecialty(Specialty  specialty) {
        specialtyRepository.save(specialty);
    }

    @Transactional
    public List<SpecialtyDTO> getSpecialtiesDTO() {
        List<Specialty> specialties = specialtyRepository.findAll();
        List<SpecialtyDTO> specialtiesDTO = new ArrayList<SpecialtyDTO>();
        for(Specialty specialty : specialties) {
            specialtiesDTO.add(specialtyMapper.toDTO(specialty));
        }
        return specialtiesDTO;
    }

    @Transactional
    public boolean findSpecialtyByName(String name) {
        Optional<Specialty> specialty = specialtyRepository.findByName(name);

        return specialty.isPresent();
    }

    public Specialty getOrCreateSpecialty(String name) {
        return specialtyRepository.findByName(name)
                .orElseGet(() -> {
                    Specialty newSpec = new Specialty();
                    newSpec.setName(name);
                    return specialtyRepository.save(newSpec);
                });
    }
}
