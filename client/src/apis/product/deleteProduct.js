import axios from "axios";

export const deleteProduct = async (productId) => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.delete(`${API_URL}/deleteProduct/${productId}`);

    const data = response?.data; // If response exists, get response data
    return { success: true, data };
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
    return {
      success: false,
      error: "An error occurred while deleting the product.",
    };
  }
};
