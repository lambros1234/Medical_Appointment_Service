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

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const url = error.config?.url;

  //     // Ignore login errors
  //     if (url?.includes("/auth/signin")) {
  //       return Promise.reject(error);
  //     }

  //     if (error.response?.status === 401 || error.response?.status === 403) {
  //       localStorage.clear();
  //       window.location.href = "/login";
  //     }

  //     return Promise.reject(error);
  //   }
  // );