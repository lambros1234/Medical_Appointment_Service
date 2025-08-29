import axios from "axios";

export async function getDoctors() {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT
    const res = await axios.get("http://localhost:8080/api/doctor", {      
      headers: {
        Authorization: `Bearer ${token}`
      }}); 
    return res.data; // Axios puts the JSON directly in `data`
  } catch (error) {
    throw new Error("Failed to fetch doctors: " + error.message);
  }
}
