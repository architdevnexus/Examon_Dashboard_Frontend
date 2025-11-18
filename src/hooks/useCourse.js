import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddCourse,
  GetCourses,
  GetCourseById,
  DeleteCourse,
  UpdateCourse,
} from "../Handler/CourseHandler";

const useGetCourse = () => {
  // console.log("in hook")
  return useQuery({
    queryKey: ["course"],
    queryFn: GetCourses,
  });
};

const useGetCourseById = (ids) => {
  return useQuery({
    queryKey: ["course", ids.id],
    queryFn: () => GetCourseById(ids),
    enabled: !!ids.id,
  });
};

const useAddCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
    onError: (e) => {
      console.log("useAddCourse", e);
    },
  });
};

const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
};

const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
    onError: (e) => {
      console.log("useAddCourse", e);
    },
  });
};

export {
  useGetCourse,
  useGetCourseById,
  useDeleteCourse,
  useAddCourse,
  useUpdateCourse,
};
