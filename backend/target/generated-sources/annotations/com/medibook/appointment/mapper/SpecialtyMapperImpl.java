package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.SpecialtyDTO;
import com.medibook.appointment.entities.Specialty;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-04T15:38:40+0300",
    comments = "version: 1.5.0.Final, compiler: Eclipse JDT (IDE) 3.42.50.v20250729-0351, environment: Java 21.0.8 (Eclipse Adoptium)"
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
