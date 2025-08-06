package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-08-03T12:02:18+0300",
    comments = "version: 1.5.0.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorDTO toDTO(Doctor_Profile doctor) {
        if ( doctor == null ) {
            return null;
        }

        DoctorDTO doctorDTO = new DoctorDTO();

        doctorDTO.setId( (long) doctor.getId() );

        doctorDTO.setUsername( doctor.getUser().getUsername() );
        doctorDTO.setEmail( doctor.getUser().getEmail() );
        doctorDTO.setPhone( doctor.getUser().getPhone() );
        doctorDTO.setSpecialties( doctor.getSpecialties().stream().map(s -> s.getName()).collect(java.util.stream.Collectors.toList()) );

        return doctorDTO;
    }

    @Override
    public List<DoctorDTO> toDTOList(List<Doctor_Profile> doctors) {
        if ( doctors == null ) {
            return null;
        }

        List<DoctorDTO> list = new ArrayList<DoctorDTO>( doctors.size() );
        for ( Doctor_Profile doctor_Profile : doctors ) {
            list.add( toDTO( doctor_Profile ) );
        }

        return list;
    }
}
