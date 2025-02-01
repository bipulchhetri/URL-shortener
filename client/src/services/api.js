import axios from "axios";

const API_URL = "http://localhost:5001"; // Update with your backend URL

export const fetchAnalytics = async (shortUrl) => {
  const response = await axios.get(`${API_URL}/analytics/${shortUrl}`);
  return response.data;
};
