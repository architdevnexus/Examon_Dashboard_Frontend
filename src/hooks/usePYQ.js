import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddPYQ, GetPYQs, DeletePYQ, UpdatePYQ } from "../Handler/PYQHandler";

export const useGetPYQs = () => {
  return useQuery({
    queryKey: ["pyqs"],
    queryFn: GetPYQs,
  });
};

export const useAddPYQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddPYQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pyqs"] });
    },
  });
};

export const useDeletePYQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeletePYQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pyqs"] });
    },
  });
};

export const useUpdatePYQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdatePYQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pyqs"] });
    },
  });
};
