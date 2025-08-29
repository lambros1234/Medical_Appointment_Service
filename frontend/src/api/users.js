import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const token = localStorage.getItem("token");

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchUsers = async () => {
    const response = await axios.get(API_URL, authHeader );
    return response.data;
};
// Delete a user
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`, authHeader);
  return response.data;
};

// Approve a user
export const approveUser = async (userId) => {
  const response = await axios.patch(`${API_URL}/${userId}/approve`, null, authHeader);
  return response.data;
};

// Update/Edit a user
export const updateUser = async (userId, data) => {
  const response = await axios.put(`${API_URL}/${userId}`, data, authHeader);
  return response.data;
};
