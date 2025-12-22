import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useGetContent, useUpdateOrDeleteContent } from "../hooks/useHooks";
import ListingPageHeader from "../Component/Header/ListingPageHeader";
import Loader from "../Component/Loader";

import { MdDelete } from "react-icons/md";
import { MoonLoader } from "react-spinners";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    subtitle: "",
    description: "",
    link: "",
  });

  const [deletingId, setDeletingId] = useState(false);
  const [preview, setPreview] = useState(null);
  const imgRef = useRef(null);

  const {
    data,
    isLoading,
    isError: isError2,
    error: error2,
  } = useGetContent({
    keys: ["notification"],
    handlerProps: {
      url: "/notification/latest",
    },
  });

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["notification"],
  });
  // delete exam

  if (isLoading) return <Loader />;

  if (isError2) {
    //console.log(error2);
    return;
  }
  //console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const FD = new FormData();
    for (const key in formData) {
      FD.append(key, formData[key]);
    }
 
    mutate(
      {
        method: "post",
        url: "notification/create",
        data: FD,
      },
      {
        onSuccess: (d) => {
          setFormData({
            image: null,
            title: "",
            subtitle: "",
            description: "",
            link: "",
          });
          setPreview(null);
          if (imgRef.current) imgRef.current.value = null;
          toast.success(d.message);
        },
        onError: (err) => {
          //console.log(err);
          toast.error(err?.message || "Something went wrong");
        },
      }
    );
  };

  const onDelete = (id) => {
    //console.log(id);
    setDeletingId(id);
    mutate(
      {
        method: "delete",
        url: `/notification/delete/${id}`,
      },
      {
        onSuccess: (resp) => {
          //console.log(resp);
          toast.success("Notification deleted");
          setDeletingId(null);
        },
        onError: (err) => {
          //console.log(err);
          toast.error(err.response?.data?.message || "error");
          setDeletingId(null);
        },
      }
    );
  };

  const inputClass =
    "w-full p-2 resize-none border border-gray-300 rounded mb-4";

  const headerProps = {
    heading: "Send Notification",
    hideSearch: true,
    btnText: "+ Add Offer",
    redirectURL: "/notification/offer",
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 font-sans"> */}
      <ListingPageHeader props={headerProps} />

      {/* 2-column layout: 3/5 form + 2/5 side list */}
      <div className="grid gap-6 md:grid-cols-5">
        {/* Left: Form */}
        <div className="md:col-span-3">
          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 border border-gray-200">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image*
                </label>
                <input
                  type="file"
                  ref={imgRef}
                  disabled={isPending}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:cursor-pointer text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  // required
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-40 h-40 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  disabled={isPending}
                  maxLength={50}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter notification title"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Subtitle*
                </label>
                <input
                  type="text"
                  name="subtitle"
                  maxLength={80}
                  disabled={isPending}
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter short subtitle"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  disabled={isPending}
                  value={formData.description}
                  maxLength={200}
                  rows={4}
                  onChange={handleChange}
                  placeholder="Enter notification description"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Redirect URI*
                </label>
                <input
                  type="url"
                  name="link"
                  disabled={isPending}
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter redirect URL"
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Notification"}
              </button>

              {isError && (
                <p className="mt-2 text-center font-medium text-red-600">
                  {error?.response?.data?.message || "Something went wrong"}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Right: Other notifications list */}
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
                      title={n.description}
                      className={`border relative border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition
                            ${deletingId === n._id ? "animate-pulse" : ""}
                          `}
                    >
                      <p
                        title={n.title}
                        className="text-xs text-blue-500 font-medium mb-1"
                      >
                        {n.title.length > 30
                          ? n.title.slice(0, 30) + "..."
                          : n.title}
                      </p>
                      <p
                        title={n.subtitle}
                        className="text-sm font-semibold text-gray-800"
                      >
                        {n.subtitle.length > 40
                          ? n.subtitle.slice(0, 40) + "..."
                          : n.subtitle}
                      </p>
                      <div className="flex justify-between">
                        <a
                          href={n.link}
                          target="_blank"
                          className="text-sm font-semibold text-blue-800 underline"
                        >
                          Link
                        </a>
                        {n.image && (
                          <a
                            href={n.image}
                            target="_blank"
                            className="text-sm font-semibold text-blue-800 underline"
                          >
                            Image
                          </a>
                        )}
                      </div>

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
      {/* </div> */}
    </div>
  );
};

export default NotificationForm;
