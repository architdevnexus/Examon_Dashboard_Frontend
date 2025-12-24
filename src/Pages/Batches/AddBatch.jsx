import { useRef, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks.js";
import InputField from "../../Component/Input/InputField.jsx";

const INITIAL_STATE = {
  image: null,
  image2: null,
  batchCategory: "",
  batchName: "",
  syllabus: "",
  description: "",
  perks: "",
  duration: "",
  price: "",
  finalPrice: "",
  teachers: "",
  enrollLink: "",
};

const AddBatchForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [priceError, setPriceError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["batch"],
  });

  /* ------------------ AUTO DISCOUNT % ------------------ */
  const discountPercent = useMemo(() => {
    const price = Number(formData.price);
    const final = Number(formData.finalPrice);

    if (!price || !final || final > price) return 0;

    return Number((((price - final) / price) * 100).toFixed(2));
  }, [formData.price, formData.finalPrice]);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = ({ target: { name, value } }) => {
    setPriceError("");

    if (
      name === "finalPrice" &&
      Number(formData.price) &&
      Number(value) > Number(formData.price)
    ) {
      setPriceError(
        "After discount price cannot be greater than original price"
      );
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e, key, setPreview) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((p) => ({ ...p, [key]: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }
    e.target.value = null;
    setPreview(null);
    toast.error("Please select a valid image file");
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.price || !formData.finalPrice) {
      setPriceError("Price and after discount price are required");
      return;
    }

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) return;

      if (key === "image") fd.append("image1", value);
      else if (key === "image2") fd.append("image2", value);
      else if (key === "finalPrice") fd.append("discount", value);
      else if (key === "batchCategory")
        fd.append("batchCategory", value.trim() || "Other");
      else fd.append(key, value);
    });

    //  Explicit backend key
    fd.append("discountPercent", discountPercent);
    for (let pair of fd.entries()) {
      console.log(pair[0], ":", pair[1]);
    }
    console.groupEnd();

    mutate(
      {
        method: "post",
        url: "/live/batches",
        data: fd,
        onUploadProgress: (e) => {
          if (!e.total) return;
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      },
      {
        onSuccess: () => {
          toast.success("Batch added successfully");
          setFormData(INITIAL_STATE);
          setPreview1(null);
          setPreview2(null);
          setUploadProgress(0);
          imgRef1.current.value = null;
          imgRef2.current.value = null;
          navigate("/batches");
        },
        onError: (e) => toast.error(e.message),
      }
    );
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Add New Batch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Images */}
        <section>
          <h3 className="text-lg font-medium mb-3">Batch Images</h3>
          <div className="gap-6">
            {[
              [
                "image",
                imgRef1,
                preview1,
                setPreview1,
                "Banner Image",
                "aspect-video",
              ],
              [
                "image2",
                imgRef2,
                preview2,
                setPreview2,
                "Thumbnail Image",
                "aspect-square h-90",
              ],
            ].map(([key, ref, preview, setPreview, label, className]) => (
              <div key={key}>
                <InputField
                  ref={ref}
                  label={label}
                  type="file"
                  disabled={isPending}
                  accept="image/*"
                  required
                  onChange={(e) => handleImage(e, key, setPreview)}
                />
                {preview && (
                  <img
                    src={preview}
                    className={`mt-3 rounded-lg object-contain ${className}`}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="grid grid-cols-2 gap-6">
          <InputField
            disabled={isPending}
            label="Batch Category"
            name="batchCategory"
            value={formData.batchCategory}
            onChange={handleChange}
          />
          <InputField
            disabled={isPending}
            label="Batch Name"
            name="batchName"
            required
            value={formData.batchName}
            onChange={handleChange}
          />
          <InputField
            disabled={isPending}
            label="Syllabus"
            name="syllabus"
            required
            value={formData.syllabus}
            onChange={handleChange}
          />
          <InputField
            disabled={isPending}
            label="Duration"
            name="duration"
            required
            value={formData.duration}
            onChange={handleChange}
          />
        </section>

        <InputField
          label="Description"
          name="description"
          disabled={isPending}
          type="textarea"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          inputClassName="resize-none"
        />
        <InputField
          label="Perks"
          name="perks"
          value={formData.perks}
          disabled={isPending}
          onChange={handleChange}
        />

        {/* Pricing */}
        <section className="bg-gray-50 p-6 rounded-xl border">
          <h3 className="text-lg font-medium mb-4">Pricing</h3>

          <div className="grid grid-cols-3 gap-6">
            <InputField
              label="Original Price (₹)"
              name="price"
              type="number"
              required
              min={0}
              disabled={isPending}
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              label="After Discount Price (₹)"
              name="finalPrice"
              type="number"
              min={0}
              disabled={isPending}
              required
              value={formData.finalPrice}
              onChange={handleChange}
            />
            <InputField
              label="Discount % (Auto)"
              type="number"
              value={discountPercent}
              disabled
            />
          </div>

          {priceError && (
            <p className="text-red-600 text-sm mt-2">{priceError}</p>
          )}
        </section>

        <InputField
          label="Teachers"
          name="teachers"
          value={formData.teachers}
          onChange={handleChange}
          disabled={isPending}
        />
        <InputField
          label="Enroll Link"
          name="enrollLink"
          type="url"
          required
          value={formData.enrollLink}
          disabled={isPending}
          onChange={handleChange}
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Uploading..." : "Add Batch"}
        </button>

        {isError && <p className="text-red-600">{error.message}</p>}
      </form>
    </div>
  );
};

export default AddBatchForm;
