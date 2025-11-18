import axios from "axios";

const token = localStorage.getItem("token");

const BASE_URL = "http://194.238.18.1:3004/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const AddCourse = async (newCourse) => {
  console.log(newCourse);
  const { data } = await api.post("/course/create", newCourse);

  return data;
};

const GetCourses = async () => {
  const { data } = await api.get("/course/all");
  return data;
};

const GetCourseById = async (ids) => {
  const { data } = await api.get(`/course/${ids.cid}/${ids.id}`);
  return data;
};

const DeleteCourse = async ({ cid, id }) => {
  const { data } = await api.delete(`/course/delete/${cid}/${id}`);
  return data;
};

const UpdateCourse = async ({ ids, formData1: update }) => {
  const { data } = await api.patch(
    `/course/update/${ids.cid}/${ids.id}`,
    update
  );

  return data;
};

export { AddCourse, GetCourses, GetCourseById, DeleteCourse, UpdateCourse };
