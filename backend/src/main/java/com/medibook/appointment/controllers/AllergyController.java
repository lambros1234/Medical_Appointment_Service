package com.medibook.appointment.controllers;


import com.medibook.appointment.dto.AllergyDTO;
import com.medibook.appointment.entities.Allergy;
import com.medibook.appointment.service.AllergyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/allergy")
public class AllergyController {

    private AllergyService  allergyService;

    public AllergyController(AllergyService allergyService) {
        this.allergyService = allergyService;
    }

    @GetMapping
    public List<AllergyDTO> getAllAllergies() {
        return allergyService.getAllAllergiesDTO();
    }
}
