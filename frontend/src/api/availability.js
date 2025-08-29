import axios from "axios";

const API_URL = "http://localhost:8080/api/availability";
const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


export const fetchAvailability = async (doctorID) => {
  try {
    const response = await axios.get(`${API_URL}/${doctorID}`, authHeader);
    return response.data;
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
};

export const addAvailability = async (availability, doctorID) => {
  try {
    const response = await axios.post(`${API_URL}/${doctorID}`, availability, authHeader);
    return response.data;
  } catch (error) {
    console.error("Error adding availability:", error);
    throw error;
  }
};



