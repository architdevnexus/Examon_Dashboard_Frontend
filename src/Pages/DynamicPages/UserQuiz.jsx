import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetContentById } from "../../hooks/useHooks";
import Loader from "../../Component/Loader";

/* ============================================================
   Skeleton Loader (Improved)
============================================================ */
const SkeletonRow = () => (
  <tr>
    {[1, 2, 3, 4, 5].map((i) => (
      <td
        key={i}
        className="border px-4 py-3 animate-pulse bg-gray-200 h-5 rounded"
      ></td>
    ))}
  </tr>
);

/* ============================================================
   Quiz Details Modal (Improved UI + Animations)
============================================================ */
const QuizDetailsModal = ({ quiz, onClose }) => {
  if (!quiz) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 z-50 px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Quiz Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Attempted on:{" "}
            <span className="font-medium">
              {new Date(quiz.attemptedAt).toLocaleString()}
            </span>
          </p>

          {/* Questions */}
          <div className="space-y-4">
            {quiz.questions?.map((q, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <p className="font-semibold text-gray-800 mb-2">
                  {index + 1}. {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correctAnswer;
                    const isUser = idx === q.userAnswer;

                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg border transition
                          ${
                            isCorrect
                              ? "bg-green-100 border-green-400"
                              : isUser
                              ? "bg-red-100 border-red-400"
                              : "bg-gray-50 border-gray-200"
                          }
                        `}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ============================================================
   MAIN COMPONENT (Production Ready)
============================================================ */
const UserQuiz = () => {
  const { id } = useParams();

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { data, isLoading, isError, error } = useGetContentById({
    id,
    keys: ["quiz", id],
    handlerProps: {
      url: `/user/quizzes/${id}`,
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return;
  }

  console.log(data);

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        Attempted Quizzes ({data.totalAttempts})
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="border px-4 py-3 text-left">S.No.</th>
              <th className="border px-4 py-3 text-left">Quiz Name</th>
              <th className="border px-4 py-3 text-left">Score</th>
              <th className="border px-4 py-3 text-left">Max Score</th>
              <th className="border px-4 py-3 text-left">Attempted</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {/* Loading State */}
            {isLoading && [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {/* Empty State */}
            {!isLoading && data.totalAttempts === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No quizzes attempted yet.
                </td>
              </tr>
            )}

            {/* Data */}
            {!isLoading &&
              data.attempts.map((quiz, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition cursor-pointer border-b"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <td className="px-4 py-3 font-medium">{idx + 1}</td>
                  <td className="px-4 py-3">{quiz.quizTitle}</td>
                  <td className="px-4 py-3">{quiz.score}</td>
                  <td className="px-4 py-3">{quiz.totalMarks}</td>
                  <td className="px-4 py-3">
                    {new Date(quiz.attemptedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <QuizDetailsModal
        quiz={selectedQuiz}
        onClose={() => setSelectedQuiz(null)}
      />
    </div>
  );
};

export default UserQuiz;
