import { useEffect, useState } from "react";
import { useGetCourseById, useUpdateCourse } from "../../hooks/useCourse";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";
import { useNavigate, useParams } from "react-router-dom";

const CourseUpdateForm = () => {
  const navigate = useNavigate();
  const { cid, id } = useParams();

  const ids = {
    cid,
    id,
  };

  const [formData, setFormData] = useState({
    img: null,
    title: "",
    insideCourses: "",
    description: "",
    perks: "",
    previousprice: "",
    actualprice: "",
    percent: "",
    Discount: "true",
    amount: "",
  });

  const [preview, setPreview] = useState(null);

  const {
    data: course,
    isSuccess,
    isLoading,
    isPending,
    isError,
    error,
  } = useGetCourseById(ids);

  const {
    mutate,
    isPending: isPending2,
    isError: isError2,
    error: error2,
  } = useUpdateCourse();

  useEffect(() => {
    if (isSuccess && course?.data) {
      const data = course.data;

      setFormData({
        img: data.img || null,
        title: data.title || "",
        insideCourses: Array.isArray(data.insideCourses)
          ? data.insideCourses.join(", ")
          : data.insideCourses || "",
        description: data.description || "",
        perks: Array.isArray(data.perks)
          ? data.perks.join(", ")
          : data.perks || "",
        previousprice: data.previousprice || "",
        actualprice: data.actualprice || "",
        percent: data.percent || "",
        Discount: String(data.Discount ?? true),
        amount: data.amount || "",
      });

      setPreview(data.img || null);
    }
  }, [isSuccess, course]);

  if (isLoading) return <Loader />;

  if (isError || isError2) {
    console.log(error, error2);
    return;
  }

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, img: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    for (const key in formData) {
      formData1.append(key, formData[key]);
    }

    mutate(
      { ids, formData1 },
      {
        onSuccess: (resp) => {
          setFormData({
            img: null,
            title: "",
            insideCourses: "",
            description: "",
            perks: "",
            previousprice: "",
            actualprice: "",
            percent: "",
            Discount: "true",
            amount: "",
          });
          console.log(resp);
          toast.success("Course Updated");
          navigate("/courses");
        },
        onError: (e) => {
          console.log(e);
          toast.error("error");
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Update Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Course Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg  "
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. GATE 2026 (CE) – Master Batch"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Inside Courses */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Inside Courses
          </label>
          <textarea
            name="insideCourses"
            value={formData.insideCourses}
            onChange={handleChange}
            placeholder="Full Technical Syllabus, Engineering Mathematics, Aptitude..."
            className="border border-gray-300 p-2 rounded w-full h-24 resize-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief course description..."
            className="border border-gray-300 p-2 rounded w-full h-20 resize-none"
          />
        </div>

        {/* Perks */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Perks
          </label>
          <input
            type="text"
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="e.g. RECORDED, PYQs, LIVE TESTS"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Previous Price (₹)
            </label>
            <input
              type="number"
              name="previousprice"
              value={formData.previousprice}
              onChange={handleChange}
              placeholder="e.g. 12000"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Actual Price (₹)
            </label>
            <input
              type="number"
              name="actualprice"
              value={formData.actualprice}
              onChange={handleChange}
              placeholder="e.g. 4999"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Discount Section */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              name="percent"
              value={formData.percent}
              onChange={handleChange}
              placeholder="e.g. 58"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 800"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discount Active
            </label>
            <select
              name="Discount"
              value={formData.Discount}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending2}
          style={{
            cursor: isPending2 ? "not-allowed" : "pointer",
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {isPending2 ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseUpdateForm;
