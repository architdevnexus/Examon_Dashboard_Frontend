import { X } from "lucide-react";

export default function CourseDetailsModal({ course, onClose }) {
  return (
    <div className="fixed   inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl relative animate-scaleIn overflow-y-auto max-h-[90vh]">
        <button
          className="absolute  top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {course?.title}
        </h2>

        {/* Image */}
        {course?.img && (
          <div className="flex justify-center mb-4">
            <img
              src={course.img}
              alt={course.title}
              className="w-100 aspect-[2/1.5] object-cover rounded-xl shadow-md  "
            />
          </div>
        )}

        {/* Course Info */}
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">Exam Category:</span>{" "}
            {course?.examCategory}
          </p>

          <p>
            <span className="font-semibold text-gray-800">Inside Courses:</span>
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            {course?.insideCourses?.map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>

          <p>
            <span className="font-semibold text-gray-800">Description:</span>{" "}
            {course?.description}
          </p>

          <p>
            <span className="font-semibold text-gray-800">Perks:</span>
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            {course?.perks?.map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="mt-4 p-4 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Pricing
            </h3>
            <p>
              <span className="font-semibold">Actual Price:</span> ₹
              {course?.actualprice}
            </p>
            <p>
              <span className="font-semibold">Previous Price:</span> ₹
              {course?.previousprice}
            </p>
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {course?.Discount === "true" ? "Yes" : "No"}
            </p>
            {course?.amount && (
              <p>
                <span className="font-semibold">You Save:</span> ₹
                {course.amount} ({course.percent}%)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
