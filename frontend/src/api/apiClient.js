import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired / invalid tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);