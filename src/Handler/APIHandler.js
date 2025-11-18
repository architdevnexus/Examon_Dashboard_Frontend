import axios from "axios";

const BASE_URL = "http://194.238.18.1:3004/api";
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
