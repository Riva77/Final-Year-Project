import axios from "axios"; // Now you can use axios to make HTTP requests

export const getTopProducts = async () => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.get(`${API_URL}/getTopProducts`);

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
