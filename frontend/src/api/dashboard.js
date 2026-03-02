import { api } from "./apiClient";

const APPOINTMENT_URL = "/dashboard";

export async function getDoctorDashboardStats() {
  const response = await api.get(`${APPOINTMENT_URL}/doctor`);
  return response.data;
}

export async function getPatientDashboardStats() {
  const response = await api.get(`${APPOINTMENT_URL}/patient`);
  return response.data;
}

