import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AddBlog,
  GetBlogs,
  GetBlogById,
  DeleteBlog,
  UpdateBlog,
} from "../Handler/BlogHandler";

export const useGetBlog = () => {
  return useQuery({
    queryKey: ["blog"],
    queryFn: GetBlogs,
  });
};

//  Get single blog by id
export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => GetBlogById(id),
    enabled: !!id,
  });
};

//  Add new blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddBlog,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

//  Delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteBlog,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

//  Update blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateBlog,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};
