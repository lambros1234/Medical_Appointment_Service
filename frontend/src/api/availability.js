import { api } from "./apiClient";

const AVAILABILITY_URL = "/availability";

// Always read latest doctorID (avoid stale value on first login)
const getDoctorId = () => localStorage.getItem("doctorID");

// Fetch availability for a specific doctor (PUBLIC VIEW)
export const fetchAvailabilityByDoctor = async (doctorId) => {
  const response = await api.get(`${AVAILABILITY_URL}/${doctorId}`);
  return response.data;
};

// Fetch availability for logged-in doctor (DASHBOARD)
export const fetchMyAvailability = async () => {
  const doctorID = getDoctorId();
  const response = await api.get(`${AVAILABILITY_URL}/${doctorID}`);
  return response.data;
};

// Add availability (doctor dashboard)
export const addAvailability = async (availability) => {
  const doctorID = getDoctorId();
  const response = await api.post(`${AVAILABILITY_URL}/${doctorID}`, availability);
  return response.data;
};

// Fetch slots for booking (PUBLIC VIEW)
export const fetchSlots = async (doctorId, date) => {
  const response = await api.get(`${AVAILABILITY_URL}/${doctorId}/slots`, {
    params: { date },
  });
  return response.data;
};

export const deleteAvailability = async (id) => {
  const response = await api.delete(`${AVAILABILITY_URL}/${id}`);
  return response.data;
};