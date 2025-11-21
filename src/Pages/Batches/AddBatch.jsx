import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks.js";

const AddBatchForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    batchCategory: "",
    batchName: "",
    syllabus: "",
    duration: "",
    price: "",
    teachers: "",
    enrollLink: "",
  });

  const imgRef = useRef();

  const Navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["batch"],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    for (const key in formData) {
      if (formData.batchCategory.trim() === "") {
        formData1.batchCategory = "Other";
      }
      formData1.append(key, formData[key]);
    }

    mutate(
      {
        method: "post",
        url: "/live/batches",
        data: formData1,
      },
      {
        onSuccess: (resp) => {
          setFormData({
            image: null,
            batchCategory: "",
            batchName: "",
            syllabus: "",
            duration: "",
            price: "",
            teachers: "",
            enrollLink: "",
          });
          imgRef.current.value = null;
          setPreview(null);
          toast.success("Batch Added");
          Navigate("/batches");
        },
        onError: (e) => {
          console.log(e);
          toast.error("error");
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add New Batch
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Batch Image
          </label>
          <input
            ref={imgRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg  "
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Category
          </label>
          <input
            type="text"
            name="batchCategory"
            value={formData.batchCategory}
            onChange={handleChange}
            placeholder="e.g. BEF"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Batch Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Name
          </label>
          <input
            type="text"
            name="batchName"
            value={formData.batchName}
            onChange={handleChange}
            placeholder="e.g. All in One – Master Batch"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Syllabus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Syllabus
          </label>
          <input
            type="text"
            name="syllabus"
            value={formData.syllabus}
            onChange={handleChange}
            placeholder="Tech + Non Tech covered"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 2 Years"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            min={0}
            max={500000}
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 5999"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Teachers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teachers
          </label>
          <input
            type="text"
            name="teachers"
            value={formData.teachers}
            onChange={handleChange}
            placeholder="e.g. Shivam Sir, Gaurav Sir"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enroll Link:
          </label>
          <input
            type="url"
            name="enrollLink"
            value={formData.enrollLink}
            onChange={handleChange}
            placeholder="e.g. https://www.classplus.com/batch/..."
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isPending ? "Adding..." : "Add Batch"}
        </button>
        {isError && (
          <p className="text-red-600 font-medium mt-2"> {error.message}</p>
        )}
      </form>
    </div>
  );
};

export default AddBatchForm;
