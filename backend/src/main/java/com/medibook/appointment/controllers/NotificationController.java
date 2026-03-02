package com.medibook.appointment.controllers;

import com.medibook.appointment.dto.NotificationDTO;
import com.medibook.appointment.entities.Notification;
import com.medibook.appointment.entities.User;
import com.medibook.appointment.repositories.NotificationRepository;
import com.medibook.appointment.service.NotificationService;
import com.medibook.appointment.service.UserDetailsImpl;
import com.medibook.appointment.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final UserService userService;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    public NotificationController(UserService userService, NotificationService notificationService, NotificationRepository notificationRepository) {
        this.userService = userService;
        this.notificationService = notificationService;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/unread")
    public List<NotificationDTO> getUnreadNotifications(Authentication authentication) {
        Long id = ((UserDetailsImpl) authentication.getPrincipal()).getId();

        return notificationRepository
                .findByUserIdAndReadFalse(id)
                .stream()
                .map(NotificationDTO::new)
                .toList();
    }

    @PatchMapping("/read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}
