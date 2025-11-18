import React from "react";
import { FaUser, FaStore, FaClock } from "react-icons/fa";

export default function FeedbackCard({
  avatar,
  name,
  role,
  content,
  targetRetailer,
  status,
  submitted_on,
}) {
  return (
    <div className="flex gap-4 bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition duration-300">
      <img
        src={avatar}
        alt={name}
        className="w-14 h-14 rounded-full border object-cover"
      />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {role === "customer" ? (
                <>
                  <FaUser className="text-blue-500" />
                  Customer
                </>
              ) : (
                <>
                  <FaStore className="text-green-600" />
                  Retailer
                </>
              )}
            </p>
            {role === "customer" && targetRetailer && (
              <p className="text-sm text-gray-600 mt-1">
                Feedback for:{" "}
                <span className="font-medium text-gray-800">
                  {targetRetailer}
                </span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                status === "new"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "reviewed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {status}
            </span>
            <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <FaClock /> {new Date(submitted_on).toLocaleDateString()}
            </span>
          </div>
        </div>
        <p className="mt-2 text-gray-700 text-sm">{content}</p>
      </div>
    </div>
  );
}
