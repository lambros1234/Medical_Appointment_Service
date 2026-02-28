import axios from "axios";

const API_URL = "http://localhost:8080/api/notifications";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const fetchUnreadNotifications = async () => {
    try {        
        const res = await axios.get(`${API_URL}/unread`, getAuthHeader());
        return res.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }       
};

export const markNotificationRead = async (id) => {
   try {     
        await axios.patch(`${API_URL}/read/${id}`, {}, getAuthHeader());
    } catch (error) {
        console.error("Error marking notification read:", error);
    }   
};
