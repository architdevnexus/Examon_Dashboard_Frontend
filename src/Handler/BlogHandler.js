import axios from "axios";

const BASE_URL = "http://194.238.18.1:3004/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//  POST - Add new blogs
export const AddBlog = async (newBlog) => {
  const { data } = await api.post("/create-blogs", newBlog);
  return data;
};

//  GET - All blogs
export const GetBlogs = async () => {
 
};

//  GET - blogs by ID
export const GetBlogById = async (id) => {
  const { data } = await api.get(`/blogs/${id}`);
  return data;
};

//  DELETE - blogs
export const DeleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/delete/${id}`);
  return data;
};

//  PATCH - Update blogs
export const UpdateBlog = async ({ id, update }) => {
  const { data } = await api.patch(`/blogs/update/${id}`, update);

  return data;
};
