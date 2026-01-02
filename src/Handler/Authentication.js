import axios from "axios";

export const CheckIn = async ({ url, subuser, credentials }) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/admin/${subuser ? "subuser/" : ""}${url}`,
    credentials
  );

  return data;
};

export const CheckOut = async (url) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/logout${url}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
