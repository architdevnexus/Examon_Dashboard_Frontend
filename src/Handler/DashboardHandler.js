import axios from "axios";

const token = localStorage.getItem("token");

const BASE_URL = "http://194.238.18.1:3004/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const GetData = async () => {
  const { data } = await api.get("/totalcount");

  return data;
};
