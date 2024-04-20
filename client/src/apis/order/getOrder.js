import axios from "axios";

export const getOrder = async () => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.get(`${API_URL}/getOrder`);

    const data = response?.data; // if response exist the get response data
    return data;
  } catch (error) {
    if (
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status <= 500
    ) {
      return {
        success: false,
        error: error.response.data.message || error.response.data,
      };
    }
  }
};
