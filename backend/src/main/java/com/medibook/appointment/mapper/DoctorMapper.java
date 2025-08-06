package com.medibook.appointment.mapper;


import com.medibook.appointment.dto.DoctorDTO;
import com.medibook.appointment.entities.Doctor_Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mapping(target = "username", expression = "java(doctor.getUser().getUsername())") // or use first/last name if available
    @Mapping(target = "email", expression = "java(doctor.getUser().getEmail())")
    @Mapping(target = "phone", expression = "java(doctor.getUser().getPhone())")
    @Mapping(target = "specialties", expression = "java(doctor.getSpecialties().stream().map(s -> s.getName()).collect(java.util.stream.Collectors.toList()))")
    DoctorDTO toDTO(Doctor_Profile doctor);

    List<DoctorDTO> toDTOList(List<Doctor_Profile> doctors);
}
