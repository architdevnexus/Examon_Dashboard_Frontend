import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/Loader.jsx";
import { toast } from "react-toastify";
import {
  useGetContentById,
  useUpdateOrDeleteContent,
} from "../../hooks/useHooks.js";
import InputField from "../../Component/Input/InputField.jsx";
import { AiOutlineDelete } from "react-icons/ai";

const BatchUpdateForm = () => {
  const { cid, id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [priceError, setPriceError] = useState("");

  const [formData, setFormData] = useState({
    image: null,
    image2: null,
    batchName: "",
    syllabus: "",
    description: "",
    perks: "",
    duration: "",
    link: [{
      id: 1,
      title: "",
      url: "",
    }],
    price: "",
    finalPrice: "",
    teachers: "",
    enrollLink: "",
  });

  // keep refs for current objectURLs so we can revoke them
  const currentPreviewRef = useRef(null);
  const currentPreview2Ref = useRef(null);

  const {
    data: batch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContentById({
    keys: ["batches", id],
    id,
    handlerProps: {
      url: `/live/batches/${cid}/${id}`,
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["batches"],
  });

  const discountPercent = useMemo(() => {
    const price = Number(formData.price);
    const final = Number(formData.finalPrice);

    if (!price || !final || final > price) return 0;

    return Number((((price - final) / price) * 100).toFixed(2));
  }, [formData.price, formData.finalPrice]);

  useEffect(() => {
    if (isSuccess && batch?.data) {
      const data = batch.data;
      // console.log(data);
      setFormData({
        image: null,
        image2: null,
        batchName: data?.batchName ?? "",
        syllabus: data?.syllabus ?? "",
        description: data?.description ?? "",
        perks: data?.perks ?? "",
        link: data?.link ?? [{
          id: 1,
          title: "",
          url: "",
        }],
        duration: data?.duration ?? "",
        price: data?.price ?? "",
        finalPrice: data?.discount ?? "",
        teachers: data?.teachers ?? "",
        enrollLink: data?.enrollLink ?? "",
      });

      // preview existing images (server-provided URLs). Use data.images[] if present, else fallback to fields you had.
      // Revoke any previous object URLs (defensive)
      if (
        currentPreviewRef.current &&
        currentPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(currentPreviewRef.current);
      }
      if (
        currentPreview2Ref.current &&
        currentPreview2Ref.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(currentPreview2Ref.current);
      }

      // Prefer data.images array (you were using that earlier); fallback to single image fields
      const existing1 = Array.isArray(data?.images)
        ? data.images[0]
        : data?.image ?? null;
      const existing2 = Array.isArray(data?.images)
        ? data.images[1]
        : data?.image2 ?? null;

      setPreview(existing1 ?? null);
      setPreview2(existing2 ?? null);

      currentPreviewRef.current = existing1 ?? null;
      currentPreview2Ref.current = existing2 ?? null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, batch]);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (
        currentPreviewRef.current &&
        currentPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(currentPreviewRef.current);
      }
      if (
        currentPreview2Ref.current &&
        currentPreview2Ref.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(currentPreview2Ref.current);
      }
    };
  }, []);

  if (isLoading) return <Loader />;

  if (isError) {
    toast.error(error?.message ?? "Failed to load batch");
    return null;
  }

  // Handle file upload for image1
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    // revoke previous objectURL if it was a blob
    if (
      currentPreviewRef.current &&
      currentPreviewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(currentPreviewRef.current);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      currentPreviewRef.current = url;
      setPreview(url);
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      currentPreviewRef.current = null;
      setPreview(null);
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  // Handle file upload for image2
  const handleFileChange2 = (e) => {
    const file = e.target.files?.[0] ?? null;

    // revoke previous objectURL if it was a blob
    if (
      currentPreview2Ref.current &&
      currentPreview2Ref.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(currentPreview2Ref.current);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      currentPreview2Ref.current = url;
      setPreview2(url);
      setFormData((prev) => ({ ...prev, image2: file }));
    } else {
      currentPreview2Ref.current = null;
      setPreview2(null);
      setFormData((prev) => ({ ...prev, image2: null }));
    }
  };

  // generic change handler for text/number/select/textarea
  const handleChange = (e) => {
    const { name, type, value } = e.target;

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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
  };

  const RemoveLink = (id) => {
    const popUpRes = confirm("Confirm to delete this question");

    if (popUpRes) {
      const remainingLinks = formData.link.filter((l) => l.id !== id);

      setFormData((prev) => ({
        ...prev,
        link: remainingLinks,
      }));
    }
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      link: [
        ...prev.link,
        {
          id: prev.link.length + 1,
          title: "",
          url: "",
        },
      ],
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.link];
    updatedLinks[index - 1][field] = value;
    setFormData((prev) => ({ ...prev, link: updatedLinks }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // append all non-file fields
    // const skip = new Set(["image", "image2"]);
    // for (const key in formData) {
    //   if (
    //     Object.prototype.hasOwnProperty.call(formData, key) &&
    //     !skip.has(key)
    //   ) {
    //     payload.append(key, formData[key] ?? "");
    //   }
    // }

    // // append files if provided (file objects) — server expects image1 & image2 (matching your previous code)
    // if (formData.image) payload.append("image1", formData.image);
    // if (formData.image2) payload.append("image2", formData.image2);
    // if (discountPercent) payload.append("discountPercent", discountPercent);
    // if (discountPercent) payload.append("discount", formData.finalPrice);

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) return;

      if (key === "image") fd.append("image1", value);
      else if (key === "image2") fd.append("image2", value);
      else if (key === "finalPrice") fd.append("discount", value);
      else if (key === "link") fd.append("link", JSON.stringify(value));
      else if (key === "batchCategory")
        fd.append("batchCategory", value.trim() || "Other");
      else fd.append(key, value);
    });

    //  Explicit backend key
    fd.append("discountPercent", discountPercent);

    mutate(
      {
        method: "patch",
        url: `/live/batches/update/${cid}/${id}`,
        data: fd,
      },
      {
        onSuccess: (resp) => {
          // cleanup object URLs we created
          if (
            currentPreviewRef.current &&
            currentPreviewRef.current.startsWith("blob:")
          ) {
            URL.revokeObjectURL(currentPreviewRef.current);
            currentPreviewRef.current = null;
          }
          if (
            currentPreview2Ref.current &&
            currentPreview2Ref.current.startsWith("blob:")
          ) {
            URL.revokeObjectURL(currentPreview2Ref.current);
            currentPreview2Ref.current = null;
          }

          // reset local state (keep UX simple)
          setFormData({
            image: null,
            image2: null,
            batchName: "",
            syllabus: "",
            description: "",
            perks: "",
            link: [{
              id: 1,
              title: "",
              url: "",
            }],
            duration: "",
            price: "",
            teachers: "",
            enrollLink: "",
          });
          setPreview(null);
          setPreview2(null);

          toast.success("Batch Updated");
          navigate("/batches");
        },
        onError: (e) => {
          console.error("Update error:", e);
          toast.error("Failed to update batch");
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Update Batch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="  gap-4">
          <div className="flex-1">
            <InputField
              disabled={isPending}
              label="Banner Image"
              name="image1"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              inputClassName="border p-2 rounded w-full"
            // helpText="Recommended: 400x400"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 object-contain aspect-video  rounded-lg"
              />
            )}
          </div>

          <div className="flex-1">
            <InputField
              disabled={isPending}
              label="Thumbnail Image*"
              name="image2"
              type="file"
              accept="image/*"
              onChange={handleFileChange2}
              inputClassName="border p-2  rounded w-full"
              helpText="This image is required for listings"
            />
            {preview2 && (
              <img
                src={preview2}
                alt="Preview"
                className="mt-4 aspect-square h-90 object-contain  rounded-lg"
              />
            )}
          </div>
        </div>

        <InputField
          disabled={isPending}
          // maxLength={60}
          label="Batch Name"
          name="batchName"
          value={formData.batchName}
          onChange={handleChange}
          placeholder="e.g. All in One – Master Batch"
          required
        />

        <InputField
          disabled={isPending}
          // maxLength={200}
          label="Syllabus"
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          placeholder="Tech + Non Tech covered"
        />

        <InputField
          disabled={isPending}
          label="Duration"
          // maxLength={20}
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g. 2 Years"
        />

        <InputField
          disabled={isPending}
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Brief batch description..."
          inputClassName=" resize-none"
        />

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Links</h3>

          {formData.link.map((l, index) => (
            <div
              key={index}
              className="border relative flex rounded-xl gap-1 p-4 mb-4 bg-gray-50 shadow-sm"
            >
              <input
                required
                type="text"
                onChange={(e) =>
                  handleLinkChange(l.id, "title", e.target.value)
                }
                value={l.title}
                placeholder="Title"
                className="border p-2 w-1/2 rounded "
              />
              <input
                required
                type="url"
                value={l.url}
                onChange={(e) =>
                  handleLinkChange(l.id, "url", e.target.value)
                }
                placeholder="Url"

                className="border p-2 w-1/2 rounded"
              />
              <span
                onClick={() => {
                  RemoveLink(l.id);
                }}
                className="flex justify-center items-center cursor-pointer rounded-full p-1 bg-red-600 text-white "
              >
                <AiOutlineDelete size={21} />
              </span>
            </div>
          ))}

          <button
            type="button"
            onClick={addLink}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Link
          </button>
        </div>

        <InputField
          disabled={isPending}
          label="Perks"
          name="perks"
          value={formData.perks}
          onChange={handleChange}
          placeholder="e.g. RECORDED, PYQs, LIVE TESTS"
        />

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
          disabled={isPending}
          // maxLength={100}
          label="Teachers"
          name="teachers"
          value={formData.teachers}
          onChange={handleChange}
          placeholder="e.g. Shivam Sir, Gaurav Sir"
        />

        <InputField
          disabled={isPending}
          // maxLength={100}
          label="Enroll link"
          name="enrollLink"
          value={formData.enrollLink}
          onChange={handleChange}
          placeholder="e.g. https://example.com/enroll"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isPending ? "Updating..." : "Update Batch"}
        </button>
      </form>
    </div>
  );
};

export default BatchUpdateForm;
