import { useState } from "react";
import { Check, X, Star, TurkishLira } from "lucide-react"; // icons
import { useDeleteReview, useUpdateReview } from "../../hooks/useReview";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

export default function ReviewCard({ review }) {
  const [hovered, setHoverd] = useState(false);

  const [Expand, setExpand] = useState(false);

  const MAX = 160;

  const shortText = review.review.slice(0, MAX);
  const isLong = review.review.length > MAX;

  const { mutate: DeleteReview, isPending: isDeletionPending } =
    useDeleteReview();

  const { mutate, isPending } = useUpdateReview();

  const handleUpdate = (id, status) => {
    mutate(
      { id, status },
      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success(status);
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.response.data.message);
        },
      }
    );
  };
  const OnDelete = (id) => {
    const isConfirmed = confirm("Are you sure? want to delete this review.");

    if (!isConfirmed) return;
    // setHoverd(true);
    DeleteReview(id, {
      onSuccess: (resp) => {
        console.log(resp);
        toast.success("Review Deleted");
        setHoverd(false);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <div
      className={`bg-white border relative border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition flex flex-col sm:flex-row gap-5      ${
        isDeletionPending && "animate-pulse"
      }     `}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
    >
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={review.profilePicture}
          alt={review.clientname}
          className="w-15 aspect-square rounded-full object-cover      r-gray-300"
        />
      </div>

      {/* Review Details */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {review.clientname}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-800">Course: </span>
          {review.course}
        </p>

        <p className="text-gray-600 italic border-l-2 border-blue-500 pl-2">
          {Expand || !isLong ? review.review : `${shortText}...`}

          {isLong && (
            <span
              onClick={() => setExpand(!Expand)}
              className="underline cursor-pointer text-blue-700 ml-2"
            >
              {Expand ? "less" : "more"}
            </span>
          )}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < review.star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              review.status == "active"
                ? "bg-green-100 text-green-700"
                : review.status == "reject"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {review.status}
          </span>
        </div>
      </div>

      {/* Buttons */}
      {review.status == "pending" ? (
        <div className="flex sm:flex-col gap-2 justify-center">
          <button
            disabled={isPending}
            style={{
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              handleUpdate(review._id, "active");
            }}
            className="flex items-center justify-center gap-1 bg-green-600 text-white p-1 rounded-lg hover:bg-green-700"
          >
            <Check size={15} /> Approve
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              handleUpdate(review._id, "reject");
            }}
            style={{
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            className="flex items-center justify-center gap-1 bg-red-600 text-white p-1  rounded-lg hover:bg-red-700"
          >
            <X size={15} /> Reject
          </button>
        </div>
      ) : (
        (hovered || isDeletionPending) && (
          <div
            className={`absolute bottom-3 right-3 flex flex-col items-center gap-3 rounded-full bg-gray-100/80 backdrop-blur-sm p-2 transition-all duration-300 
               hover:opacity-100
             
            overflow-hidden`}
          >
            {isDeletionPending ? (
              <MoonLoader color="#003e68" size={20} />
            ) : (
              <MdDelete
                size={30}
                className="bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition"
                title="Delete Review"
                onClick={() => OnDelete?.(review._id)}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}
