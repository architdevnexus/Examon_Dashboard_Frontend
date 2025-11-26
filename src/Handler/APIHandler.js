import axios from "axios";

const BASE_URL = "https://backend.palgharhome.com/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const apiRequest = async ({
  method = "get",
  url,
  data = null,
  params = {},
}) => {
  const { data: d1 } = await api({
    method,
    url,
    data,
    params,
  });
  return d1;
};

export const apiRequest4Mutation = async ({
  method = "get",
  url,
  data = null,
  params = {},
}) => {
  const { data: d1 } = await api({
    method,
    url,
    data,
    params,
  });
  return d1;
};
