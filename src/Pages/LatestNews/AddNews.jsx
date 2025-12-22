import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";

const AddNewsForm = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const { mutate, isPending, error } = useUpdateOrDeleteContent({
    keys: ["news"],
  });

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (files) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  // 🔹 Submit form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    for (const key in formData) {
      formData1.append(key, formData[key]);
    }

    mutate(
      { data: formData1, url: "/news/create", method: "post" },
      {
        onSuccess: (resp) => {
          setFormData({
            image: null,
            title: "",
            description: "",
          });
          setPreview(null);
          toast.success("News Added");
          Navigate("/news");
        },
        onError: (e) => {
          //console.log(e);
          toast.error("error");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add News
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              disabled={isPending}
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:cursor-pointer  text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
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

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter news title"
              maxLength={100}
              disabled={isPending}
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              rows={5}
              disabled={isPending}
              maxLength={1000}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 "
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add News"}
          </button>
        </form>

        {error && (
          <p
            className={`mt-4 text-center font-medium text-red-600"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddNewsForm;
