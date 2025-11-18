import { useState } from "react";

import ListingPageHeader from "../../../Component/Header/ListingPageHeader";
import QuizCard from "../../../Component/Cards/QuizCard";
import { useDeleteQuiz } from "../../../hooks/useStudyMaterial.js";
import Loader from "../../../Component/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetContent } from "../../../hooks/useHooks.js";

const QuizListPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const {
    data: QuizData,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["quiz"],
    handlerProps: {
      url: "/quizzes",
    },
  });

  const { mutate } = useDeleteQuiz();

  // console.log(isLoading, isError);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  // console.log(QuizData);

  // Filter by search
  const filteredQuizzes = QuizData.quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.exam.toLowerCase().includes(search.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const headerProps = {
    heading: "All Quizzes",
    placeholder: "Search Quiz",
    btnText: "+ Add Quiz",
    searchTerm: search,
    setSearchTerm: setSearch,
    redirectURL: "/studymaterial/add-quiz",
  };

  const onDelete = ({ id }) => {
    const isConfirmed = confirm("Confirm to delete the quiz");

    if (!isConfirmed) return;

    setDeletingId(id);

    mutate(id, {
      onSuccess: (resp) => {
        console.log(resp);
        setDeletingId(null);
        toast.success("Quiz deleted");
      },
      onError: (e) => {
        console.log(e);
        toast.error(e.response.data.message);

        setDeletingId(null);
      },
    });
  };
  const onEdit = ({ id }) => {
    if (!id) {
      toast.error("Id not found");
      return;
    }

    navigate(`/studymaterial/update-quiz/${id}`);
  };

  return (
    // <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <ListingPageHeader props={headerProps} />

      {/* Quizzes */}
      {filteredQuizzes.length === 0 && (
        <p className="text-gray-500">No quizzes found.</p>
      )}

      {filteredQuizzes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz, i) => (
            <QuizCard
              key={i}
              onDelete={onDelete}
              isDeleting={deletingId === quiz._id}
              onEdit={onEdit}
              quiz={quiz}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
