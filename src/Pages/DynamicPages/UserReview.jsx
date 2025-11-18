import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------ STAR COMPONENT ------------------ */
const StarRating = ({ star }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`text-lg ${
          i <= star ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

/* ------------------ POPUP MODAL ------------------ */
const ReviewModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Full Review
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <img
              src={review.profilePicture}
              alt=""
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-semibold">{review.clientname}</p>
              <StarRating star={review.star} />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{review.review}</p>

          <p className="mt-4 text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ------------------ SKELETON LOADER ------------------ */
const SkeletonRow = () => (
  <tr>
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <td key={i} className="animate-pulse bg-gray-200 h-6 rounded"></td>
      ))}
  </tr>
);

/* ------------------ MAIN COMPONENT ------------------ */
const UserReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUserReviews = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://194.238.18.1:3004/api/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user reviews");

      const data = await res.json();
      setReviews(data?.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserReviews();
  }, [id]);

  if (error)
    return (
      <div className="p-4 text-red-600 font-medium bg-red-100 rounded-lg">
        ⚠ {error}
      </div>
    );

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        User Reviews ({reviews.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="border px-4 py-3 text-left">S.No.</th>
              <th className="border px-4 py-3 text-left">Name</th>
              <th className="border px-4 py-3 text-left">Rating</th>
              <th className="border px-4 py-3 text-left">Review</th>
              <th className="border px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading
              ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              : reviews.length === 0
              ? (
                <tr>
                  <td colSpan="5" className="py-5 text-center text-gray-500 italic">
                    No reviews available.
                  </td>
                </tr>
                )
              : reviews.map((review, idx) => (
                  <tr
                    key={review._id}
                    className="hover:bg-gray-50 transition border-b cursor-pointer"
                    onClick={() => setSelectedReview(review)}
                  >
                    <td className="px-4 py-3 font-medium">{idx + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.profilePicture}
                          alt="user"
                          className="w-10 h-10 rounded-full border shadow-sm object-cover"
                        />
                        <span className="font-semibold text-gray-800">
                          {review.clientname}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <StarRating star={review.star} />
                    </td>

                    <td className="px-4 py-3 text-gray-700 truncate max-w-[250px]">
                      {review.review}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(review.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
};

export default UserReview;
