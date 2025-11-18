import { useRef, useState } from "react";
import { useAddCourse } from "../../hooks/useCourse";
import { toast } from "react-toastify";

const CourseFormPage = () => {
  const [formData, setFormData] = useState({
    img: null,
    title: "",
    insideCourses: "",
    description: "",
    perks: "",
    examCategory: "",
    previousprice: "",
    actualprice: "",
    percent: "",
    Discount: "true",
    amount: "",
  });

  const imgRef = useRef();

  const [preview, setPreview] = useState(null);

  const { mutate, isSuccess, isPending, isError, error } = useAddCourse();

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

    mutate(formData1, {
      onSuccess: (resp) => {
        setFormData({
          img: null,
          title: "",
          insideCourses: "",
          description: "",
          perks: "",
          examCategory: "",
          previousprice: "",
          actualprice: "",
          percent: "",
          Discount: "true",
          amount: "",
        });
        imgRef.current = null;
        console.log(resp);
        toast.success("Course added");
      },
      onError: (e) => {
        console.log(e);
        toast.error("error");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Course Image
          </label>
          <input
            ref={imgRef}
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

        {/* course category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Course Category
          </label>
          <input
            type="text"
            name="examCategory"
            value={formData.examCategory}
            onChange={handleChange}
            placeholder="e.g. UPSC/GATE/JEE"
            className=" border border-gray-300  p-2 rounded w-full"
          />
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
          disabled={isPending}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {isPending ? "Saving..." : "Save Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseFormPage;
