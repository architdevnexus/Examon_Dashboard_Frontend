import { useState, useEffect } from "react";
import { useGetBatchById, useUpdateBatch } from "../../hooks/useBatch.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/Loader.jsx";
import { toast } from "react-toastify";

const BatchUpdateForm = () => {
  const { cid, id } = useParams();
  const navigate = useNavigate();

  const ids = { cid, id };

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    image: null,
    batchName: "",
    syllabus: "",
    duration: "",
    price: "",
    teachers: "",
    enrollLink: "",
  });

  const {
    data: batch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBatchById(ids);

  const { mutate, isPending: isPending1, error: error2 } = useUpdateBatch();

  useEffect(() => {
    if (isSuccess && batch?.data) {
      const data = batch.data;
      //   console.log(data);
      setFormData({
        image: data?.image,
        batchName: data?.batchName,
        syllabus: data?.syllabus,
        duration: data?.duration,
        price: data?.price,
        teachers: data?.teachers,
        enrollLink: data?.enrollLink,
      });

      setPreview(data.image || null);
    }
  }, [isSuccess, batch]);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    return;
  }

  //   console.log(batch.data);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    for (const key in formData) {
      console.log(formData[key]);
      formData1.append(key, formData[key]);
    }

    mutate(
      { ids, formData1 },
      {
        onSuccess: (resp) => {
          setFormData({
            image: null,
            batchName: "",
            syllabus: "",
            duration: "",
            price: "",
            teachers: "",
            enrollLink: "",
          });
          setPreview(null);

          console.log(resp);
          toast.success("Batch Updated");
          navigate("/batches");
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
        Update Batch
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Batch Image
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

        {/* Enroll link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enroll link
          </label>
          <input
            type="text"
            name="enrollLink"
            value={formData.enrollLink}
            onChange={handleChange}
            placeholder="e.g. Shivam Sir, Gaurav Sir"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending1}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isPending1 ? "Updating..." : "Update Batch"}
        </button>
      </form>
    </div>
  );
};

export default BatchUpdateForm;
