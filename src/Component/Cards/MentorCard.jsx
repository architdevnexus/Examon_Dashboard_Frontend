import { useState } from "react";
import { FaUser, FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineWork, MdLink } from "react-icons/md";
import { AiOutlineFullscreen } from "react-icons/ai";
import ActionBtns from "../ActionBtns";

export default function MentorCard({
  mentor,
  onDelete,
  isDeleting,
  onEdit,
  onView,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative mx-auto w-full rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4
      ${isDeleting ? "animate-pulse" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <img
          src={mentor?.imageUrl}
          alt={mentor?.name}
          className="w-28 h-28 rounded-full object-cover border border-indigo-500 shadow-md mx-auto sm:mx-0"
        />
        <h2 className="text-xl  font-bold text-indigo-700 flex items-center gap-2 justify-center sm:justify-start">
          {mentor?.name}
        </h2>
      </div>
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <p className="text-gray-600 flex items-start sm:items-center gap-2 justify-center sm:justify-start">
          <MdOutlineWork className="w-5 h-5 flex-shrink-0 text-gray-500 mt-1 sm:mt-0" />
          <span>{mentor?.subjectTaught}</span>
        </p>

        <p className="text-gray-600 flex items-start sm:items-center gap-2 justify-center sm:justify-start">
          <FaBookOpen className="w-5 h-5 flex-shrink-0 text-gray-500 mt-1 sm:mt-0" />
          <span>{mentor?.specialization}</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="text-sm text-gray-700 space-y-3">
        <p>
          <span className="font-semibold">Experience:</span> {mentor.experience}
        </p>

        <p className="flex items-center gap-2">
          <MdLink className="text-indigo-500" />
          <a
            href={mentor.coursesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Courses
          </a>
        </p>

        <p className="flex items-center gap-2">
          <MdLink className="text-indigo-500" />
          <a
            href={mentor.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Youtube Profile
          </a>
        </p>

        <p className="flex items-center gap-2 text-gray-500">
          <FaCalendarAlt className="text-gray-500" />
          Joined On: {new Date(mentor.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Bottom Right Fullscreen Icon */}
      <div
        onClick={() => onView(mentor)}
        className="absolute bottom-4 right-4 bg-gray-700 text-white p-2 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-indigo-600 transition"
      >
        <AiOutlineFullscreen />
      </div>

      {/* Action Buttons */}
      <ActionBtns
        onDelete={onDelete}
        onEdit={onEdit}
        isDeleting={isDeleting}
        id={mentor._id}
        hovered={hovered}
        onView={onView}
      />
    </div>
  );
}
