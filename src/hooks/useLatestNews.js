import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddNews,
  GetNews,
  GetNewsById,
  DeleteNews,
  UpdateNews,
} from "../Handler/NewsHandler.js";

const useGetNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: GetNews,
  });
};

const useGetNewsById = (id) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => GetNewsById(id),
    enabled: !!id,
  });
};

const useAddNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (e) => {
      console.log("useAddnews", e);
    },
  });
};

const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (e) => {
      console.log("useupdatenews", e);
    },
  });
};

export { useGetNews, useGetNewsById, useAddNews, useDeleteNews, useUpdateNews };
