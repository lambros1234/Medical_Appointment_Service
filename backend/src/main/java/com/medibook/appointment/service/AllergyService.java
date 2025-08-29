package com.medibook.appointment.service;

import com.medibook.appointment.dto.AllergyDTO;
import com.medibook.appointment.entities.Allergy;
import com.medibook.appointment.mapper.AllergyMapper;
import com.medibook.appointment.repositories.AllergyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AllergyService {

    private AllergyRepository allergyRepository;
    private AllergyMapper allergyMapper;

    public AllergyService(AllergyRepository allergyRepository,  AllergyMapper allergyMapper) {
        this.allergyRepository = allergyRepository;
        this.allergyMapper = allergyMapper;
    }

    @Transactional
    public List<AllergyDTO> getAllAllergiesDTO() {
        List<Allergy> allergies = allergyRepository.findAll();
        List<AllergyDTO> allergiesDTO = new ArrayList<>();
        for (Allergy allergy : allergies) {
            allergiesDTO.add(allergyMapper.toDTO(allergy));
        }
        return  allergiesDTO;
    }



}
