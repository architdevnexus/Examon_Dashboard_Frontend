import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNewsById, useUpdateNews } from "../../hooks/useLatestNews";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";

const UpdateNewsForm = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);

  const { data, isLoading, isSuccess, isError, error } = useGetNewsById(id);
  const { mutate, isPending } = useUpdateNews();

  useEffect(() => {
    if (isSuccess && data.success) {
      const news = data.data;
      setFormData({
        image: null,
        title: news.title,
        description: news.description,
      });
      setPreview(news.image);
    }
  }, [isSuccess, data]);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

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

  //  Submit form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const formData1 = new FormData();

    for (const key in formData) {
      formData1.append(key, formData[key]);
    }

    mutate(
      { id, formData1 },
      {
        onSuccess: (resp) => {
          console.log(resp);
          setFormData({
            image: null,
            title: "",
            description: "",
          });
          setPreview(null);
          toast.success(resp.message);
          Navigate("/news");
        },
        onError: (e) => {
          console.log(e);
          toast.error(e.response.data.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add News / Notification
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
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:cursor-pointer  text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
               
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
              rows={4}
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
            {isPending ? "Updating..." : "Update News"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNewsForm;
