import axios from "axios";

export const CheckIn = async (url, credentials) => {
  const { data } = await axios.post(
    `http://194.238.18.1:3004/api/admin/${url}`,
    credentials
  );
  return data;
};
