package com.medibook.appointment;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class MedicalAppointmentBookingSystemApplicationTests {
	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	public void testCreateUser() throws Exception {
		// Arrange
		String userJson = "{"
				+ "\"username\":\"johndoe\","
				+ "\"email\":\"john@mail.com\","
				+ "\"password\":\"123456\","
				+ "\"role\":[\"PATIENT\"],"
				+ "\"firstName\":\"John\","
				+ "\"lastName\":\"Doe\","
				+ "\"phone\":\"123456789\","
				+ "\"address\":\"Athens, Greece\""
				+ "}";

		// Act
		ResultActions result = mockMvc.perform(post("/api/auth/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(userJson));

		// Assert
		result.andExpect(status().isOk());
	}


}
