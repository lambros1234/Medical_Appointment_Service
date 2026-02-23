import axios from "axios";

const API_URL = "http://localhost:8080/api/availability";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const doctorID = localStorage.getItem("doctorID");


// Fetch availability for a specific doctor (PUBLIC VIEW)
export const fetchAvailabilityByDoctor = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor availability:", error);
    throw error;
  }
};


// Fetch availability for logged-in doctor (DASHBOARD)
export const fetchMyAvailability = async () => {
  try {
    const response = await axios.get(`${API_URL}/${doctorID}`, getAuthHeader());
    console.log("Fetched my availability:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching my availability:", error);
    throw error;
  }
};


// Add availability (doctor dashboard)
export const addAvailability = async (availability) => {
  try {
    const response = await axios.post(
      `${API_URL}/${doctorID}`,
      availability,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding availability:", error);
    throw error;
  }
};

export const fetchSlots = async (doctorId, date) => {
  try {
    const response = await axios.get(
      `${API_URL}/${doctorId}/slots?date=${date}`
      ,getAuthHeader() 
    );
    return response.data;
} catch (error) {
  console.error("Error fetching slots:", error);
  throw error;  
}
};

export const deleteAvailability = async (id) => {
  try {    const response = await axios.delete(
      `${API_URL}/${id}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting availability:", error);
    throw error;
  }
};