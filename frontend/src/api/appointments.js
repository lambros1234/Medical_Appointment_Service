import axios from "axios";

const API_URL = "http://localhost:8080/api/appointment"; // make sure this points to your backend
const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function getAppointments() {
  try {
    const response = await axios.get(`${API_URL}/my`, authHeader);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch appointments: " + error.message);
  }
}


export async function createAppointment(appointment) {
  try {
    const response = await axios.post(`${API_URL}`, appointment, authHeader);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create appointment: " + error.message);
  }
}

export async function fetchDoctorAppointments(doctorId, date) {
  try {
    const response = await axios.get(
      `${API_URL}/doctor/${doctorId}`, // /doctor/{id}
      {
        params: {
          date: date.format("YYYY-MM-DD"),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch booked appointments", err);
    return [];
  }
}

export async function cancelAppointment(appointmentId) {
  try {
    const response = await axios.delete(`${API_URL}/cancel/${appointmentId}`, authHeader);
    return response.data;
  } catch (error) {
    throw new Error("Failed to cancel appointment: " + error.message);
  }
}

export async function confirmAppointment(appointmentId) {
  try {
    const response = await axios.patch(
      `${API_URL}/confirm/${appointmentId}`,
      {},
      authHeader
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to confirm appointment: " + error.message);
  }
}

