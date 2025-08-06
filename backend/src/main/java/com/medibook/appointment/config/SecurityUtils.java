package com.medibook.appointment.config;

import com.medibook.appointment.entities.User;

public class SecurityUtils {

    public static boolean hasRole(User user, String role) {
        return user.getRoles().stream()
                .anyMatch(r -> r.getName().equals(role));
    }


}
