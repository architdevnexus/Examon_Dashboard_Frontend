import axios from "axios";
const BASE_URL = "http://194.238.18.1:3004/api";

// const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Quiz handlers
const AddQuiz = async (newQuiz) => {
  const { data } = await api.post("/quizzes/upload", newQuiz);
  return data;
};

const GetQuiz = async () => {
  // const { data } = await api.get("quizzes/");
  // return data;
};

const GetQuizById = async (id) => {
  const { data } = await api.get(`quizzes/${id}`);
  return data;
};

const DeleteQuiz = async (id) => {
  const { data } = await api.delete(`quizzes/${id}`);
  return data;
};

const UpdateQuiz = async ({ id, formData1: update }) => {
 

  const { data } = await api.patch(`quizzes/${id}`, update);
  return data;
};

// Notes handlers
const AddNote = async (newNotes) => {
  const { data } = await api.post(
    "http://194.238.18.1:3004/api/notes/add",
    newNotes
  );
  return data;
};

const GetNoteById = async (id) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

const GetNotes = async () => {
  const { data } = await api.get("/notes/all");
  return data;
};

const DeleteNote = async ({ cid, id }) => {
  const { data } = await api.delete(`/notes/delete/${cid}/${id}`);
  return data;
};

// PYQs handler

const AddPYQ = async (newPYQ) => {
  const { data } = await api.post("/pyq/add", newPYQ);
  return data;
};

const GetPYQs = async ({ signal } = {}) => {
  const { data } = await api.get("/pyq", { signal });
  return data;
};

const GetPYQById = async (cid, pid, { signal } = {}) => {
  const { data } = await api.get(`/pyq/${cid}/${pid}`, { signal });
  return data;
};

const DeletePYQ = async ({ cid, id }) => {
  const { data } = await api.delete(`/pyq/delete/${cid}/${id}`);
  return data;
};

const UpdatePYQ = async (cid, bid, update) => {
  const { data } = await api.patch(`/pyq/update/${cid}/${bid}`, update);
  return data;
};

export {
  AddQuiz,
  GetQuiz,
  GetQuizById,
  DeleteQuiz,
  UpdateQuiz,
  AddNote,
  GetNoteById,
  GetNotes,
  DeleteNote,
  AddPYQ,
  GetPYQs,
  GetPYQById,
  DeletePYQ,
  UpdatePYQ,
};
