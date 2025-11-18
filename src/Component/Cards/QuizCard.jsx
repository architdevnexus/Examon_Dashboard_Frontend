import { useState } from "react";
import ActionBtns from "../ActionBtns";

const QuizCard = ({ onDelete, isDeleting, onEdit, quiz }) => {
  const [hovered, setHovered] = useState();

  return (
    <div
      key={quiz.id}
      className={`bg-white relative shadow-md rounded-2xl p-5 hover:shadow-lg transition border border-gray-100
               ${isDeleting && "animate-pulse"}

        `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {quiz.title}
      </h2>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Exam:</span> {quiz.exam}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Duration:</span> {quiz.duration / 60} min
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Total Marks:</span> {quiz.totalMarks}
      </p>

      <div className="flex flex-wrap gap-1 mt-2">
        {quiz.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <ActionBtns
        hovered={hovered}
        onDelete={onDelete}
        id={quiz._id}
        onEdit={onEdit}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default QuizCard;
