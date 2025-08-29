package com.medibook.appointment.mapper;


import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mapping(source = "doctor.user.username", target = "username")
    @Mapping(source = "doctor.user.address", target="location")
    DoctorDTO toDTO(Doctor_Profile doctor);

}
