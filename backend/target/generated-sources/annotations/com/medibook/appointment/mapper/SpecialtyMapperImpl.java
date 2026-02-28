package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.SpecialtyDTO;
import com.medibook.appointment.entities.Specialty;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-28T16:33:28+0200",
    comments = "version: 1.5.0.Final, compiler: javac, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class SpecialtyMapperImpl implements SpecialtyMapper {

    @Override
    public SpecialtyDTO toDTO(Specialty specialty) {
        if ( specialty == null ) {
            return null;
        }

        String name = null;

        name = specialty.getName();

        SpecialtyDTO specialtyDTO = new SpecialtyDTO( name );

        return specialtyDTO;
    }
}
