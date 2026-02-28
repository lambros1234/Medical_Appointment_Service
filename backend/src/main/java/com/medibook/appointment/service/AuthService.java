package com.medibook.appointment.service;

import com.medibook.appointment.config.JwtUtils;
import com.medibook.appointment.entities.*;
import com.medibook.appointment.payload.request.LoginRequest;
import com.medibook.appointment.payload.request.SignupRequest;
import com.medibook.appointment.payload.response.JwtResponse;
import com.medibook.appointment.payload.response.MessageResponse;
import com.medibook.appointment.repositories.DoctorProfileRepository;
import com.medibook.appointment.repositories.PatientProfileRepository;
import com.medibook.appointment.repositories.RoleRepository;
import com.medibook.appointment.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final BCryptPasswordEncoder encoder;
    private final SpecialtyService specialtyService;
    private final EmailService emailService;
    private final NotificationService notificationService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       DoctorProfileRepository doctorProfileRepository,
                       PatientProfileRepository patientProfileRepository,
                       BCryptPasswordEncoder encoder,
                       SpecialtyService specialtyService,
                       EmailService emailService,
                       NotificationService notificationService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.encoder = encoder;
        this.specialtyService = specialtyService;
        this.emailService = emailService;
        this.notificationService = notificationService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhone(signUpRequest.getPhone());
        user.setAddress(signUpRequest.getAddress());

        // VERY IMPORTANT → new users are NOT enabled until admin approves
        user.setEnabled(false);

        Set<Role> roles = resolveRoles(signUpRequest.getRole());
        user.setRoles(roles);

        userRepository.save(user);

        createProfiles(user, roles, signUpRequest);

        userRepository.save(user);

        emailService.sendRegistrationEmail(user.getEmail());

        notifyAdminsForApproval(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully! Awaiting admin approval."));
    }

    private Set<Role> resolveRoles(Set<String> strRoles) {
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add(getRole("ROLE_USER"));
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin" -> roles.add(getRole("ROLE_ADMIN"));
                    case "patient" -> roles.add(getRole("ROLE_PATIENT"));
                    case "doctor" -> roles.add(getRole("ROLE_DOCTOR"));
                    default -> roles.add(getRole("ROLE_USER"));
                }
            });
        }

        return roles;
    }

    private Role getRole(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
    }

    private void createProfiles(User user, Set<Role> roles, SignupRequest request) {

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

                if (request.getSpecialty() != null && !request.getSpecialty().isEmpty()) {
                    Specialty specialty = specialtyService.getOrCreateSpecialty(request.getSpecialty());
                    doctorProfile.setSpecialties(List.of(specialty));
                }

                doctorProfileRepository.save(doctorProfile);
                user.setDoctorProfile(doctorProfile);
            }
        }
    }
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {

        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found!"));
        }

        User user = userOptional.get();

        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Account not approved yet"));
        }

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
                    .toList();

            Integer patientProfileId = user.getPatientProfile() != null
                    ? user.getPatientProfile().getId()
                    : null;

            Long doctorProfileId = user.getDoctorProfile() != null
                    ? user.getDoctorProfile().getId()
                    : null;

            return ResponseEntity.ok(
                    new JwtResponse(
                            jwt,
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles,
                            patientProfileId,
                            doctorProfileId
                    )
            );

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }

    private void notifyAdminsForApproval(User newUser) {

        List<User> admins = userRepository.findByRoles_Name("ROLE_ADMIN");

        String message = String.format(
                "New user %s %s (%s) requires approval.",
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getEmail()
        );

        for (User admin : admins) {
            notificationService.createNotification(admin, message);
        }
    }
}
