package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.UserDTO;
import com.medibook.appointment.entities.Role;
import com.medibook.appointment.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", expression = "java(mapRoles(user.getRoles()))")
    UserDTO toDTO(User user);

    default Set<String> mapRoles(Set<Role> roles) {
        if (roles == null) return null;
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }
}
