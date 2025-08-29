import axios from "axios";

export const Login = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/signin", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.accessToken); 
    localStorage.setItem("role", res.data.roles[0]);     // ROLE_ADMIN, etc.
    localStorage.setItem("patientID", res.data.patientID);
    localStorage.setItem("doctorID", res.data.doctorID);

    return res.data;
  } catch (err) {
    console.error("Full error response:", err.response?.data);

    if (err.response && err.response.data) {
      // check different possible fields
      const data = err.response.data;
      throw new Error(
        data.message || data.error || data.status || "Login failed"
      );
    }
    throw new Error("Network error");
  }
};
 


// LOGOUT FUNCTION
export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  window.location.href = "/"; // redirect to login page
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/auth/signup`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};




