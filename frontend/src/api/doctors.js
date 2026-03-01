import { api } from "./apiClient";

export const getDoctors = async () => {
  try {
    const response = await api.get("/doctor");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch doctors: " + (error.response?.data?.error || error.message));
  }
};

export const getDoctorsFull = async () => {
  try {
    const response = await api.get("/doctor/full");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch full doctor data: " + (error.response?.data?.error || error.message));
  }
};