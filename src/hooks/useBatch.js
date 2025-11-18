import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddBatch,
  GetBatchs,
  GetBatchById,
  DeleteBatch,
  UpdateBatch,
  GetAchievement,
  UpdateAchievement,
  DeleteBatchCategory,
} from "../Handler/BatchHandler.js";

//  Get all batches
export const useGetBatch = () => {
  return useQuery({
    queryKey: ["batch"],
    queryFn: GetBatchs,
  });
};

//  Get single batch by id
export const useGetBatchById = (ids) => {
  return useQuery({
    queryKey: ["batch", ids.id],
    queryFn: () => GetBatchById(ids),
    enabled: !!ids.id,
  });
};

//  Add new batch
export const useAddBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddBatch,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
};

//  Delete batch
export const useDeleteBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteBatch,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
};

export const useDeleteBatchCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteBatchCategory,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
};

//  Update batch
export const useUpdateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateBatch,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
};

// -----------------------achivements hooks ------------------

export const useUpdateAchievementStates = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateAchievement,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
    },
  });
};

export const useGetAchievementStates = () => {
  return useQuery({
    queryKey: ["achievement "],
    queryFn: GetAchievement,
  });
};

 