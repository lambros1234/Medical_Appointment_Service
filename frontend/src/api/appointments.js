import axios from "axios";

const API_URL = "http://localhost:8080/api/appointment";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch appointments
export async function getAppointments() {
  const response = await axios.get(`${API_URL}/my`, getAuthHeader());
  return response.data;
}

// Create appointment
export async function createAppointment(appointment) {
  const response = await axios.post(
    `${API_URL}`,
    appointment,
    getAuthHeader()
  );
  return response.data;
}

// Fetch doctor appointments
export async function fetchDoctorAppointments(doctorId, date) {
  const response = await axios.get(
    `${API_URL}/doctor/${doctorId}`,
    {
      params: {
        date: date.format("YYYY-MM-DD"),
      },
      ...getAuthHeader(),
    }
  );
  return response.data;
}

// Cancel
export async function cancelAppointment(appointmentId) {
  const response = await axios.delete(
    `${API_URL}/cancel/${appointmentId}`,
    getAuthHeader()
  );
  return response.data;
}

// Confirm
export async function confirmAppointment(appointmentId) {
  const response = await axios.patch(
    `${API_URL}/confirm/${appointmentId}`,
    {},
    getAuthHeader()
  );
  return response.data;
}