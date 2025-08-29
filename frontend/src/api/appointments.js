import axios from "axios";

const API_URL = "http://localhost:8080/api/appointment";
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
    console.log("Appointment", appointment);
    const response = await axios.post(`${API_URL}`, appointment, authHeader);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create appointment: " + error.message);
  }
}
