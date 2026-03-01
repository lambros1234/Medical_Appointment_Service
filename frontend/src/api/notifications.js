import { api } from "./apiClient";

const NOTIFICATIONS_URL = "/notifications";

export const fetchUnreadNotifications = async () => {
  try {
    const response = await api.get(`${NOTIFICATIONS_URL}/unread`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationRead = async (id) => {
  try {
    await api.patch(`${NOTIFICATIONS_URL}/read/${id}`);
  } catch (error) {
    console.error("Error marking notification read:", error);
  }
};