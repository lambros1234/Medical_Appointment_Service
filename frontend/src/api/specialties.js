import axios from "axios";

const API_URL = "http://localhost:8080/api/specialties";

export const fetchSpecialties = async () => {
    const response = await axios.get(API_URL);
    console.log("Fetched specilaties:", response.data);
    return response.data;
}

export const createSpecialty = async (name) => {
  try {
    await axios.post(API_URL + "/new", { name });
    return true; // created successfully
  } catch (err) {
    if (err.response && err.response.status === 409) {
      console.log("Specialty already exists");
      return false; // conflict, already exists
    } else {
      throw err;
    }
  }
};