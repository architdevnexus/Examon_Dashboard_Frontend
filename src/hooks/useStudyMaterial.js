import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddQuiz,
  GetQuiz,
  GetQuizById,
  DeleteQuiz,
  AddNote,
  GetNoteById,
  GetNotes,
  DeleteNote,
  AddPYQ,
  GetPYQs,
  GetPYQById,
  DeletePYQ,
  UpdatePYQ,
  UpdateQuiz,
} from "../Handler/StudyMaterial.js";

// --------------------------------Quiz hooks--------------------------------------
const useAddQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (error) => {
      console.error("Error adding quiz:", error);
    },
  });
};

const useGetQuizById = (id) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => GetQuizById(id),
    enabled: !!id,
  });
};

const useGetQuiz = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: GetQuiz,
  });
};

const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (error) => {
      console.error("Error deleting quiz:", error);
    },
  });
};

const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (error) => {
      console.error("Error adding quiz:", error);
    },
  });
};

// ------------------------------------Notes hooks------------------------------------
const useAddNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error adding notes:", error);
    },
  });
};

const useGetNoteById = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: GetNoteById,
  });
};

const useGetNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: GetNotes,
  });
};

const useDeleteNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error delete note", error);
    },
  });
};

// ---------------------------PYQ hooks-----------------------------------
const useAddPYQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddPYQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PYQ"] });
    },
    onError: (error) => {
      console.error("Error adding PYQ:", error);
    },
  });
};

const useGetPYQ = () => {
  return useQuery({
    queryKey: ["PYQ"],
    queryFn: GetPYQs,
  });
};

const useGetPYQById = () => {
  return useQuery({
    queryKey: ["PYQ"],
    queryFn: GetPYQById,
  });
};

const useUpdatePYQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePYQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PYQ"] });
    },
    onError: (error) => {
      console.error("Error Delete PYQ:", error);
    },
  });
};

export {
  useAddQuiz,
  useGetQuizById,
  useGetQuiz,
  useDeleteQuiz,
  useUpdateQuiz,
  useAddNotes,
  useGetNoteById,
  useGetNotes,
  useDeleteNotes,
  useAddPYQ,
  useGetPYQ,
  useGetPYQById,
  useUpdatePYQ,
};
