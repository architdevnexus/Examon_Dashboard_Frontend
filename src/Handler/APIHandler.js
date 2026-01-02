import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiRequest = async ({
  method = "get",
  url,
  data = null,
  params = {},
}) => {
  try {
    const { data: d1 } = await api({
      method,
      url,
      data,
      params,
    });

    return d1;
  } catch (error) {
    throw error;
  }
};

export const apiRequest4Mutation = async ({
  method = "get",
  url,
  data = null,
  params = {},
}) => {
  try {
    const { data: d1 } = await api({
      method,
      url,
      data,
      params,
    });

    return d1;
  } catch (error) {
    throw error;
  }
};
