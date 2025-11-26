import axios from "axios";

export const CheckIn = async (url, credentials) => {
  const { data } = await axios.post(
    `https://backend.palgharhome.com/api/admin/${url}`,
    credentials
  );
  return data;
};
