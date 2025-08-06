package com.medibook.appointment.mapper;

import com.medibook.appointment.dto.AppointmentResponseDTO;
import com.medibook.appointment.entities.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(source = "doctor.user.username", target = "doctorName")
    @Mapping(source = "user.username", target = "patientName")
    AppointmentResponseDTO toDTO(Appointment appointment);
}
