package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.AllergyDTO;
import com.medibook.appointment.entities.Allergy;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-28T16:33:28+0200",
    comments = "version: 1.5.0.Final, compiler: javac, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class AllergyMapperImpl implements AllergyMapper {

    @Override
    public AllergyDTO toDTO(Allergy allergy) {
        if ( allergy == null ) {
            return null;
        }

        String name = null;

        name = allergy.getAllergy();

        AllergyDTO allergyDTO = new AllergyDTO( name );

        return allergyDTO;
    }
}
