import { api } from "./apiClient";

export const Login = async (username, password) => {
  try {
    const res = await api.post("/auth/signin", { username, password });

    const data = res.data;

    // Clear any previous session data
    localStorage.clear();

    // Store token
    localStorage.setItem("token", data.accessToken);

    // Store roles safely
    const roles = data.roles || [];
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("role", roles[0] || "");

    // Store IDs only if they exist
    if (data.patientID) {
      localStorage.setItem("patientID", String(data.patientID));
    }

    if (data.doctorID) {
      localStorage.setItem("doctorID", String(data.doctorID));
    }

    return data;

  } catch (err) {
    const data = err.response?.data;
    throw new Error(data?.message || data?.error || "Login failed");
  }
};

// LOGOUT FUNCTION
export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("roles");
  localStorage.removeItem("patientID");
  localStorage.removeItem("doctorID");
  localStorage.removeItem("username");
  localStorage.removeItem("email");

  window.location.href = "/";
};

export const registerUser = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (err) {
    const data = err.response?.data;
    throw new Error(data?.message || data?.error || "Registration failed");
  }
};