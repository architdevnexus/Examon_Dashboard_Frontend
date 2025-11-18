import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest, apiRequest4Mutation } from "../Handler/APIHandler";

export const useUpdateOrDeleteContent = ({ keys }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRequest4Mutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys });
    },
    onError: (e) => {
      console.log(keys[0], e);
    },
  });
};

export const useGetContentById = ({ id, keys, handlerProps }) => {
  return useQuery({
    queryKey: keys,
    queryFn: () => apiRequest4Mutation(handlerProps),
    enabled: !!id,
  });
};

export const useGetContent = ({ keys, handlerProps }) => {
  return useQuery({
    queryKey: keys,
    queryFn: () => apiRequest(handlerProps),
  });
};
