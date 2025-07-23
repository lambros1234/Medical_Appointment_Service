package com.medibook.appointment.controllers;

import com.medibook.appointment.entities.Role;
import com.medibook.appointment.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {
    RoleRepository roleRepository;

    public AuthController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void setup() {
        Role role_owner = new Role("ROLE_OWNER");
        Role role_admin = new Role("ROLE_ADMIN");
        Role role_renter = new Role("ROLE_RENTER");

        roleRepository.updateOrInsert(role_owner);
        roleRepository.updateOrInsert(role_admin);
        roleRepository.updateOrInsert(role_renter);
    }

}
