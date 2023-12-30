import axios from "axios";

export const addProduct = async ({
  name,
  price,
  description,
  quantity,
  image,
  author,
  synopsis,
  genre,
  pages,
}) => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.post(`${API_URL}/addProduct`, {
      name,
      price,
      description,
      quantity,
      image,
      author,
      synopsis,
      genre,
      pages,
    });

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