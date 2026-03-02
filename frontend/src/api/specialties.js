import { api } from "./apiClient";

const SPECIALTIES_URL = "/specialties";

export const fetchSpecialties = async () => {
  const response = await api.get(SPECIALTIES_URL);
  console.log("Fetched specialties:", response.data);
  return response.data;
};

export const createSpecialty = async (name) => {
  try {
    await api.post(`${SPECIALTIES_URL}/new`, { name });
    return true;
  } catch (err) {
    if (err.response?.status === 409) {
      console.log("Specialty already exists");
      return false;
    }
    throw err;
  }
};