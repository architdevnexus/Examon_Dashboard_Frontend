import React from "react";

const DashCard = ({ icon, title, number, bgColor = "bg-[var(--accent)]" }) => {
  return (
    <div
      className={`${bgColor} text-white p-5 rounded-lg shadow-md flex items-center gap-4`}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default DashCard;
