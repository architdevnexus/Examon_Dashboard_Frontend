import { X } from "lucide-react";

export default function MentorDetailsModal({ mentor, onClose }) {
  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl aspect-[2/1] rounded-xl p-6 shadow-xl relative animate-scaleIn overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={mentor?.imageUrl}
            alt={mentor?.name}
            className="w-36 h-36 rounded-xl object-cover border shadow"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              {mentor?.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {mentor?.specialization}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Subject Taught:</span>{" "}
                {mentor?.subjectTaught}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {mentor?.experience}
              </p>
              <p>
                <span className="font-semibold">Courses Handled:</span>{" "}
                {mentor?.CoursesHandled}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {mentor?.description}
              </p>

              {mentor?.youtubeLink && (
                <p>
                  <span className="font-semibold">YouTube:</span>{" "}
                  <a
                    href={mentor.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {mentor.youtubeLink}
                  </a>
                </p>
              )}

              {mentor?.coursesLink && mentor.coursesLink !== "" && (
                <p>
                  <span className="font-semibold">Courses Link:</span>{" "}
                  <a
                    href={mentor.coursesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {mentor.coursesLink}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CSS for animation (add in global CSS if needed)
@keyframes scaleIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scaleIn {
  animation: scaleIn 0.2s ease-out;
}
*/
