import axios from "axios";

export const updateProduct = async (productId, formData) => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.patch(
      `${API_URL}/updateProduct/${productId}`,
      formData
    );

    const data = response?.data; // if response exists then get response data
    return { success: true, data };
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      return {
        success: false,
        error: error.response.data.message || error.response.data,
      };
    }
  }
};
