import axios from "axios"; // Now you can use axios to make HTTP requests

export const createPost = async ({ title, summary, content, image, user }) => {
  const API_URL = "http://localhost:8000/api";
  try {
    const response = await axios.post(`${API_URL}/createPost`, {
      title,
      summary,
      content,
      image,
      user,
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
