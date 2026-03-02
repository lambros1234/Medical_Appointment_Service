import { api } from "./apiClient";

export const Login = async (username, password) => {
  try {
    const res = await api.post("/auth/signin", { username, password });

    localStorage.setItem("token", res.data.accessToken);

    // Store roles as JSON array (more robust than roles[0])
    localStorage.setItem("roles", JSON.stringify(res.data.roles || []));

    // Optional: if you still want "role" for quick access, keep it too
    localStorage.setItem("role", (res.data.roles && res.data.roles[0]) || "");

    // IDs (store only if not null/undefined)
    if (res.data.patientID != null) localStorage.setItem("patientID", String(res.data.patientID));
    else localStorage.removeItem("patientID");

    if (res.data.doctorID != null) localStorage.setItem("doctorID", String(res.data.doctorID));
    else localStorage.removeItem("doctorID");

    return res.data;
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