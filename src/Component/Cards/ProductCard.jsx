import React, { useState } from 'react';

const ProductCard = ({
  product_id,
  retailer_id,
  name,
  description,
  images,
  price,
  category,
  stock,
  submitted_on,
  status,
  onChangeStatus,
}) => {
  const [newStatus, setNewStatus] = useState(status);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setNewStatus(selectedStatus);
    if (onChangeStatus) {
      onChangeStatus(product_id, selectedStatus);
    } else {
      alert(`Status change requested for: ${name} to "${selectedStatus}"`);
    }
  };

  return (
    <div className="max-w-sm flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Image */}
      <img
        src={images?.[0] || 'https://via.placeholder.com/400x300'}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 space-y-3 flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
              status === 'approved'
                ? 'bg-green-100 text-green-700'
                : status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">₹{price}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              stock > 0
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
          </span>
        </div>

        {/* Category and Submission Date */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{category}</span>
          <span>{new Date(submitted_on).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Dropdown Footer */}
      <div className="border-t p-4">
        <select
          value={newStatus}
          onChange={handleStatusChange}
          className="w-full cursor-pointer py-2 px-3 border-b text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default ProductCard;
