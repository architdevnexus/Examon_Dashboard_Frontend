import axios from "axios";

const BASE_URL = "http://194.238.18.1:3004/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//  POST - Add new batch
export const AddBatch = async (newBatch) => {
  const { data } = await api.post("/live/batches", newBatch);
  return data;
};

//  GET - All batches
export const GetBatchs = async () => {
  const { data } = await api.get("/live/batches");
  return data;
};

//  GET - Batch by ID
export const GetBatchById = async ({ id, cid }) => {
  const { data } = await api.get(`/live/batches/${cid}/${id}`);
  return data;
};

//  DELETE - Batch
export const DeleteBatch = async ({ cid, id }) => {
  const { data } = await api.delete(`/live/batches/delete/${cid}/${id}`);
  return data;
};

//  PATCH - Update Batch
export const UpdateBatch = async ({ ids, formData1: update }) => {
  const { data } = await api.patch(
    `/live/batches/update/${ids.cid}/${ids.id}`,
    update
  );

  return data;
};

export const DeleteBatchCategory = async (id) => {
  const { data } = await api.delete(`/live/category/delete/${id}`);
  return data;
};

// ------------------ Achievement handlers ------------------------

export const UpdateAchievement = async ({ id, update }) => {
  const { data } = await api.patch(`/achievement/update/${id}`, update);

  return data;
};

export const GetAchievement = async () => {
 
};
