import { useState } from "react";
import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";
import { toast } from "react-toastify";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import Loader from "../../Component/Loader";
import { MdDelete } from "react-icons/md";
import { MoonLoader } from "react-spinners";

export default function OfferForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    banner: "",
    cta: { label: "", url: "" },
    tags: [],
    tagInput: "",
    expiresIn: "",
    priority: "",
  });

  const [deletingId, setDeletingId] = useState(false);

  const {
    data,
    isLoading,
    isError: isError2,
    error: error2,
  } = useGetContent({
    keys: ["offer"],
    handlerProps: {
      url: "/notifications/discount/latest",
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["offer"],
  });

  if (isLoading) return <Loader />;

  if (isError2) {
    console.log(error2);
    return;
  }
  // console.log(data);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For nested CTA fields
    if (name === "ctaLabel" || name === "ctaUrl") {
      setFormData((prev) => ({
        ...prev,
        cta: {
          ...prev.cta,
          [name === "ctaLabel" ? "label" : "url"]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Tag
  const addTag = () => {
    const t = formData.tagInput.trim();
    if (!t) return;

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, t],
      tagInput: "",
    }));
  };

  // Remove Tag
  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const offer = new FormData();

    for (const key in formData) {
      offer.append(key, formData[key]);
    }

    mutate(
      {
        method: "post",
        data: offer,
        url: "/notifications/push",
      },
      {
        onSuccess: (resp) => {
          setFormData({
            title: "",
            description: "",
            discount: "",
            banner: "",
            cta: { label: "", url: "" },
            tags: [],
            tagInput: "",
            expiresIn: "",
            priority: "",
          });

          console.log(resp);
          toast.success("Offer added");
        },
        onError: (e) => {
          console.log(e);
          toast.error("error");
        },
      }
    );
  };

  const onDelete = (id) => {
    console.log(id);
    setDeletingId(id);
    mutate(
      {
        method: "delete",
        url: `/notification/discount/delete/${id}`,
      },
      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success("Notification deleted");
          setDeletingId(null);
        },
        onError: (err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "error");
          setDeletingId(null);
        },
      }
    );
  };
  const headerProps = {
    heading: "Add Special Offer",
    hideSearch: true,
    btnText: "← Back",
    redirectURL: "/notification",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 font-sans">
        <ListingPageHeader props={headerProps} />
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl   mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
            >
              {/* Title */}
              <div>
                <label className="font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="Mega Discount Unlocked!"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="You just unlocked a special 35% discount..."
                  required
                />
              </div>

              {/* Discount */}
              <div>
                <label className="font-medium">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="35"
                  min={1}
                  max={100}
                  required
                />
              </div>

              {/* Banner */}
              <div>
                <label className="font-medium">Banner</label>
                <select
                  name="banner"
                  value={formData.banner}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Banner Type</option>
                  <option value="limited_offer">Limited Offer</option>
                  <option value="flash_banner">Flash Banner</option>
                  <option value="premium_banner">Premium Banner</option>
                </select>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">CTA Label</label>
                  <input
                    type="text"
                    name="ctaLabel"
                    value={formData.cta.label}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enroll Now"
                    required
                  />
                </div>
                <div>
                  <label className="font-medium">CTA URL</label>
                  <input
                    type="url"
                    name="ctaUrl"
                    value={formData.cta.url}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="/course/full-stack?discount=35"
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="font-medium mb-2 block">Tags</label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    name="tagInput"
                    value={formData.tagInput}
                    onChange={handleChange}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="add tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Expires In */}
              <div>
                <label className="font-medium">Expires In</label>
                <input
                  type="text"
                  name="expiresIn"
                  value={formData.expiresIn}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="6h"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="font-medium">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold${
                  isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? "Saving..." : "Save Offer"}
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="bg-white shadow-lg rounded-xl border border-gray-200 ">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Other Notifications
                  </h3>
                  <span className="text-xs text-gray-500">
                    {data.data.length} total
                  </span>
                </div>

                {/* Scrollable list inside fixed panel */}
                <div className="max-h-[460px] overflow-y-auto px-4 py-3 space-y-3">
                  {data.data.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No notifications yet.
                    </p>
                  ) : (
                    data.data.map((n, index) => (
                      <div
                        key={index}
                        className={`border relative border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition
                          ${deletingId === n._id ? "animate-pulse" : ""}
                          `}
                      >
                        <p className="text-xs text-blue-500 font-medium mb-1">
                          {n.discount}% OFF
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <div className="absolute top-3 right-3">
                          {deletingId === n._id ? (
                            <MoonLoader color="#003e68" size={20} />
                          ) : (
                            <MdDelete
                              size={30}
                              className="bg-red-500    text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition"
                              title="Delete"
                              onClick={(e) => onDelete?.(n._id)}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
