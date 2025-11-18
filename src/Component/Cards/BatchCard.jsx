import React, { useState } from "react";
import ActionBtns from "../ActionBtns";

const BatchCard = ({ batch, onDelete, onEdit, isDeleting, cId = null }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={batch.id}
      className={`bg-white relative shadow-sm border border-gray-200 rounded-xl hover:shadow-md transition overflow-hidden
        ${isDeleting && "animate-pulse"}

        `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={batch.image}
        alt={batch.batchName}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {batch.batchName}
        </h2>

        <div className="text-sm text-gray-600">
          {batch.batchCategory && (
            <p>
              <span className="font-semibold">Category:</span>
              {batch.batchCategory}
            </p>
          )}
          <p>
            <span className="font-semibold">Syllabus:</span> {batch.syllabus}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {batch.duration}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ₹{batch.price}
          </p>
          <p>
            <span className="font-semibold">Teachers:</span> {batch.teachers}
          </p>
        </div>
        <p>
          <a
            href={batch.enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600  "
          >
            <span className="font-semibold underline">Enroll Link:</span> 👈🏿
          </a>
        </p>
      </div>
      <ActionBtns
        hovered={hovered}
        isDeleting={isDeleting}
        id={batch._id}
        cid={cId}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default BatchCard;
