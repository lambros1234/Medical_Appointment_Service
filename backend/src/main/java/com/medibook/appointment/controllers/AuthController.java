package com.medibook.appointment.controllers;

import com.medibook.appointment.entities.*;
import com.medibook.appointment.payload.request.LoginRequest;
import com.medibook.appointment.payload.response.JwtResponse;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import com.medibook.appointment.repositories.PatientProfileRepository;
import com.medibook.appointment.repositories.RoleRepository;
import com.medibook.appointment.repositories.UserRepository;
import com.medibook.appointment.service.EmailService;
import com.medibook.appointment.service.SpecialtyService;
import com.medibook.appointment.service.UserDetailsImpl;
import com.medibook.appointment.service.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.medibook.appointment.payload.request.SignupRequest;
import com.medibook.appointment.payload.response.MessageResponse;

import java.util.*;
import java.util.stream.Collectors;

import com.medibook.appointment.config.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    BCryptPasswordEncoder encoder;
    JwtUtils jwtUtils;
    DoctorProfileRepository doctorProfileRepository;
    PatientProfileRepository patientProfileRepository;
    UserService userService;
    SpecialtyService specialtyService;
    EmailService  emailService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder encoder, JwtUtils jwtUtils, DoctorProfileRepository doctorProfileRepository, PatientProfileRepository patientProfileRepository, UserService userService, SpecialtyService specialtyService, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.doctorProfileRepository = doctorProfileRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.userService = userService;
        this.specialtyService = specialtyService;
        this.emailService = emailService;
    }

    @PostConstruct
    public void setup() {
        Role role_user = new Role("ROLE_USER");
        Role role_admin = new Role("ROLE_ADMIN");
        Role role_doctor = new Role("ROLE_DOCTOR");
        Role role_patient = new Role("ROLE_PATIENT");

        roleRepository.updateOrInsert(role_user);
        roleRepository.updateOrInsert(role_admin);
        roleRepository.updateOrInsert(role_doctor);
        roleRepository.updateOrInsert(role_patient);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Step 1: Load the user manually
        Optional<User> user = userService.findUserByUsername(loginRequest.getUsername());

        if(user.isPresent()) {
            // Step 2: Check if approved

            User newUser = user.get();
            if (!newUser.isEnabled()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Account not approved yet"));
            }
            // Step 3: Authenticate credentials
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = jwtUtils.generateJwtToken(authentication);
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                List<String> roles = userDetails.getAuthorities().stream()
                        .map(item -> item.getAuthority())
                        .collect(Collectors.toList());

                User User = userService.findUserByUsername(userDetails.getUsername()).get();
                Integer patientProfileId = User.getPatientProfile() != null ? User.getPatientProfile().getId() : null;
                Integer doctorProfileId = User.getDoctorProfile() != null ? User.getDoctorProfile().getId() : null;

                return  ResponseEntity.ok(new JwtResponse(jwt,
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles, patientProfileId,
                        doctorProfileId));

            } catch (BadCredentialsException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }
        } else {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found!"));
        }

    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("signUpRequest: " + signUpRequest.toString());
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        // Set extra info
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhone(signUpRequest.getPhone());
        user.setAddress(signUpRequest.getAddress());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();


        if (strRoles == null) {
            Role userRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName("ROLE_MODERATOR")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    case "patient":
                        Role patientRole = roleRepository.findByName("ROLE_PATIENT")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(patientRole);
                        break;
                    case "doctor":
                        Role doctorRole = roleRepository.findByName("ROLE_DOCTOR")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(doctorRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName("ROLE_USER")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        userRepository.save(user);

        // Profile creation logic after user is saved
        for (Role role : roles) {
            if (role.getName().equals("ROLE_PATIENT")) {
                Patient_Profile patientProfile = new Patient_Profile();
                patientProfile.setPatient(user);
                patientProfileRepository.save(patientProfile);
                user.setPatientProfile(patientProfile);
            }

            if (role.getName().equals("ROLE_DOCTOR")) {
                Doctor_Profile doctorProfile = new Doctor_Profile();
                doctorProfile.setUser(user);

                // get specialty (create if not exists)
                if (signUpRequest.getSpecialty() != null && !signUpRequest.getSpecialty().isEmpty()) {
                    Specialty specialty = specialtyService.getOrCreateSpecialty(signUpRequest.getSpecialty());
                    List<Specialty> specialties = new ArrayList<>();
                    specialties.add(specialty);
                    doctorProfile.setSpecialties(specialties);
                }
                doctorProfileRepository.save(doctorProfile);
                user.setDoctorProfile(doctorProfile);

            }
        }

        // Save the user again to link the profiles
        userRepository.save(user);
        emailService.sendRegistrationEmail(user.getEmail());

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}