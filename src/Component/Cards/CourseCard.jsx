import { useState } from "react";

import ActionBtns from "../ActionBtns";

const CourseCard = ({ cId, course, onEdit, onDelete, onView, isDeleting }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={course._id}
      className={`bg-white relative shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all
        ${isDeleting && "animate-pulse"}
        `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Course Image */}
      <img
        src={course.img}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">
          {course.title}
        </h2>
        <p className="    text-gray-600 text-md font-bold">
          Inside course:
          <span className="text-sm font-normal">
            {course.insideCourses.slice(120)}
          </span>
        </p>
        <p className="text-gray-700   text-sm mb-3">{course.description}</p>

        <p className="text-xs   text-gray-500 mb-2">
          <span className="font-semibold">Perks:</span> {course.perks}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-green-600">
              ₹{course.actualprice}
            </span>
            <span className="line-through text-sm text-gray-400 ml-2">
              ₹{course.previousprice}
            </span>
            <span className="ml-2 text-sm text-blue-600 font-semibold">
              ({course.percent}% OFF)
            </span>
          </div>
          <button
            onClick={() => onView(course)}
            className="text-blue-600 text-sm cursor-pointer font-semibold hover:underline"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Hover Expand Action Menu */}

      <ActionBtns
        hovered={hovered}
        isDeleting={isDeleting}
        id={course._id}
        cid={cId}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CourseCard;
