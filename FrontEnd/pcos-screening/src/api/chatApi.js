import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const sendChatMessage = async (message, context = "") => {
  const response = await axios.post(
    `${API_URL}/chat`,
    {
      message: message,
      context: context
    }
  );

  return response.data;
};