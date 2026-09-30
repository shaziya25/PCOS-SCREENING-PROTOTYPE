import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const submitScreening = async (responses) => {
  const response = await axios.post(
    `${API_URL}/screening`,
    responses
  );

  return response.data;
};