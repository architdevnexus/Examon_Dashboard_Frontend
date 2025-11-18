import axios from "axios";

const BASE_URL = "http://194.238.18.1:3004/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//  POST - Add new news
const AddNews = async (newNews) => {
  const { data } = await api.post("/news/create", newNews);
  return data;
};

//  GET - All news
const GetNews = async ({ signal } = {}) => {};

//  GET - news by ID
const GetNewsById = async (id, { signal } = {}) => {
  const { data } = await api.get(`/news/${id}`, { signal });
  return data;
};

//  DELETE - news
const DeleteNews = async (id) => {
  const { data } = await api.delete(`/news/delete/${id}`);
  return data;
};

//  PATCH - Update news
const UpdateNews = async ({ id, formData1 }) => {
  const { data } = await api.patch(`/news/update/${id}`, formData1);
  return data;
};

export { AddNews, GetNews, GetNewsById, DeleteNews, UpdateNews };
