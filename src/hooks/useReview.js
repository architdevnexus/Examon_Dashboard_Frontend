import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddReview,
  GetReviews,
  UpdateReview,
  DeleteReview,
} from "../Handler/ReviewHandler.js";

//  Get all review
export const useGetReviews = () => {
  return useQuery({
    queryKey: ["review"],
    queryFn: GetReviews,
  });
};

//  Add new Review
export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddReview,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};

//  Delete Review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteReview,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};

//  Update Review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateReview,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};
