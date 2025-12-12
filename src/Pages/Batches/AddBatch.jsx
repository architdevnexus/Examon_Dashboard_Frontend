import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks.js";
import InputField from "../../Component/Input/InputField.jsx";

const AddBatchForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    image2: null,
    batchCategory: "",
    batchName: "",
    syllabus: "",
    description: "",
    perks: "",
    duration: "",
    price: "",
    teachers: "",
    enrollLink: "",
  });

  const imgRef1 = useRef();
  const imgRef2 = useRef();

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["batch"],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData((p) => ({ ...p, image: file }));
      setPreview(URL.createObjectURL(file));
    } else setPreview(null);
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData((p) => ({ ...p, image2: file }));
      setPreview2(URL.createObjectURL(file));
    } else setPreview2(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    for (const key in formData) {
      if (key === "image") fd.append("image1", formData.image);
      else if (key === "image2") fd.append("image2", formData.image2);
      else if (key === "batchCategory" && !formData.batchCategory.trim())
        fd.append("batchCategory", "Other");
      else fd.append(key, formData[key]);
    }

    mutate(
      {
        method: "post",
        url: "/live/batches",
        data: fd,
      },
      {
        onSuccess: (resp) => {
          setFormData({
            image: null,
            image2: null,
            batchCategory: "",
            batchName: "",
            syllabus: "",
            description: "",
            perks: "",
            duration: "",
            price: "",
            teachers: "",
            enrollLink: "",
          });
          imgRef1.current.value = null;
          imgRef2.current.value = null;
          setPreview(null);
          setPreview2(null);

          toast.success(
            resp.response?.data?.message ||
              resp.response?.data?.msg ||
              "Batch Added"
          );

          navigate("/batches");
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add New Batch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex-1">
            <InputField
              disabled={isPending}
              label="Batch Image"
              name="image"
              type="file"
              accept="image/*"
              required
              ref={imgRef1}
              onChange={handleFileChange}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex-1">
            <InputField
              disabled={isPending}
              label="Batch Image 2"
              name="image2"
              type="file"
              accept="image/*"
              required
              ref={imgRef2}
              onChange={handleFileChange2}
            />

            {preview2 && (
              <img
                src={preview2}
                alt="Preview2"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Category */}
        <InputField
          disabled={isPending}
          label="Batch Category"
          name="batchCategory"
          type="text"
          maxLength={25}
          value={formData.batchCategory}
          onChange={handleChange}
          placeholder="e.g. BEF"
        />

        {/* Batch Name */}
        <InputField
          disabled={isPending}
          label="Batch Name"
          name="batchName"
          type="text"
          maxLength={60}
          required
          value={formData.batchName}
          onChange={handleChange}
          placeholder="e.g. Master Batch"
        />

        {/* Syllabus */}
        <InputField
          disabled={isPending}
          label="Syllabus"
          name="syllabus"
          type="text"
          maxLength={200}
          required
          value={formData.syllabus}
          onChange={handleChange}
          placeholder="Tech + Non Tech covered"
        />

        {/* Duration */}
        <InputField
          disabled={isPending}
          label="Duration"
          name="duration"
          type="text"
          maxLength={20}
          required
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g. 2 Years"
        />

        {/* Description */}
        <InputField
          disabled={isPending}
          label="Description"
          name="description"
          type="textarea"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief batch description..."
          inputClassName=" resize-none"
        />

        {/* Perks */}
        <InputField
          disabled={isPending}
          label="Perks"
          name="perks"
          type="text"
          value={formData.perks}
          onChange={handleChange}
          placeholder="e.g. RECORDED, PYQs, LIVE TESTS"
        />

        {/* Price */}
        <InputField
          disabled={isPending}
          label="Price"
          name="price"
          type="number"
          required
          min={0}
          max={500000}
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 5999"
        />

        {/* Teachers */}
        <InputField
          disabled={isPending}
          label="Teachers"
          name="teachers"
          type="text"
          maxLength={100}
          value={formData.teachers}
          onChange={handleChange}
          placeholder="e.g. Shivam Sir, Gaurav Sir"
        />

        {/* Enroll Link */}
        <InputField
          disabled={isPending}
          label="Enroll Link"
          name="enrollLink"
          type="url"
          maxLength={100}
          required
          value={formData.enrollLink}
          onChange={handleChange}
          placeholder="e.g. https://www.classplus.com/batch/..."
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          style={{ cursor: isPending ? "not-allowed" : "pointer" }}
        >
          {isPending ? "Adding..." : "Add Batch"}
        </button>

        {isError && (
          <p className="text-red-600 font-medium mt-2">{error.message}</p>
        )}
      </form>
    </div>
  );
};

export default AddBatchForm;
