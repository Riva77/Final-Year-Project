import axios from "axios";

export const addRemoveFavourites = async ({ userId, productId }) => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.patch(
      `${API_URL}/addFavouriteBook/${userId}`,
      {
        productId,
      }
    );

    const data = response?.data; // if response exist the get response data
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
  }
};
