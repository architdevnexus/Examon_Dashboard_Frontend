import axios from "axios";
const BASE_URL = "http://194.238.18.1:3004/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// Quiz handlers
const AddReview = async (newReview) => {};

const GetReviews = async () => {
  const { data } = await api.get("/review/get");
  return data;
};

const UpdateReview = async ({ id, status }) => {
  const { data } = await api.patch(`/review/update/${id}`, { status });
  return data;
};

const DeleteReview = async (id) => {
  const { data } = await api.delete(`/review/delete/${id}`);
  return data;
};

export { AddReview, GetReviews, UpdateReview, DeleteReview };
