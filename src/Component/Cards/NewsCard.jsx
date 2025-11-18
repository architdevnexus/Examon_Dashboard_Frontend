import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import ActionBtns from "../ActionBtns";

export default function NewsCard({ news, onEdit, onDelete, isDeleting }) {
  const [hovered, setHovered] = useState(false);
  const [Expand, setExpand] = useState(false);
  const MAX = 160;

  const shortText = news.description.slice(0, MAX);
  const isLong = news.description.length > MAX;
  return (
    <div
      className={`bg-white relative border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden
        ${isDeleting && "animate-pulse"}
        `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5   flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {news.title}
        </h2>

        <p className="text-sm  text-gray-600 mb-3">
          {Expand || !isLong ? news.description : `${shortText}...`}

          {isLong && (
            <span
              onClick={() => setExpand(!Expand)}
              className="underline cursor-pointer text-blue-700 ml-2"
            >
              {Expand ? "less" : "more"}
            </span>
          )}
        </p>

        <div className="text-xs text-gray-500 mb-3">
          Posted on: {new Date(news.createdAt).toLocaleDateString()}
        </div>

        {/* Buttons */}
        <div className="flex border justify-between mt-auto gap-2">
          <button
            onClick={() => onView(news)}
            className="flex items-center gap-1 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700"
          >
            <Eye size={16} /> View
          </button>
          <button
            onClick={() => onEdit(news)}
            className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-green-700"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(news._id)}
            className="flex items-center gap-1 bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <ActionBtns
        hovered={hovered}
        isDeleting={isDeleting}
        id={news._id}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}
