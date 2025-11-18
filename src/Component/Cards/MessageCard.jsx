import React from 'react';
import { FaUser, FaBoxOpen, FaClock } from 'react-icons/fa';

const MessageCard = ({ message }) => {
  const { sender_id, receiver_id, product_id, content, timestamp } = message;

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FaUser className="text-indigo-500" />
          <span><strong>Sender ID:</strong> {sender_id}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FaUser className="text-pink-500" />
          <span><strong>Receiver ID:</strong> {receiver_id}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FaBoxOpen className="text-green-500" />
          <span><strong>Product ID:</strong> {product_id}</span>
        </p>

        <p className="text-gray-800 mt-3 text-base">
          <strong>Message:</strong> {content}
        </p>

        <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
          <FaClock className="text-yellow-500" />
          <span>{formatDateTime(timestamp)}</span>
        </p>
      </div>
    </div>
  );
};

export default MessageCard;

