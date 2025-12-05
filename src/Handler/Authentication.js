import axios from "axios";

export const CheckIn = async (url, credentials) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/admin/${url}`,
    credentials
  );
  return data;
};
