package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.UserDTO;
import com.medibook.appointment.entities.User;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-04T15:38:40+0300",
    comments = "version: 1.5.0.Final, compiler: Eclipse JDT (IDE) 3.42.50.v20250729-0351, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        String id = null;
        String username = null;
        String email = null;
        boolean enabled = false;

        if ( user.getId() != null ) {
            id = String.valueOf( user.getId() );
        }
        username = user.getUsername();
        email = user.getEmail();
        enabled = user.isEnabled();

        Set<String> role = mapRoles(user.getRoles());

        UserDTO userDTO = new UserDTO( id, username, email, role, enabled );

        return userDTO;
    }
}
