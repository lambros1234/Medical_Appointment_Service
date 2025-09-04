package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.AllergyDTO;
import com.medibook.appointment.entities.Allergy;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-04T15:38:40+0300",
    comments = "version: 1.5.0.Final, compiler: Eclipse JDT (IDE) 3.42.50.v20250729-0351, environment: Java 21.0.8 (Eclipse Adoptium)"
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
