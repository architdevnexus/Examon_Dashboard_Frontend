import { useState } from "react";
import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";
import { toast } from "react-toastify";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import Loader from "../../Component/Loader";
import { MdDelete } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import MultipleValues from "../../Component/Input/MultipleValues";

export default function OfferNotification() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    batch: "",
    tags: [],
    tagInput: "",
    link: "",
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

  const {
    data: batchNames,
    isLoading: batchesLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["batch"],
    handlerProps: {
      url: "/live/batches/name",
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["offer"],
  });

  if (isLoading) return <Loader />;

  // if (!batchesLoading && !isError) console.log(batchNames);

  if (isError2) {
    //console.log(error2);
    return;
  }

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(formData);

    mutate(
      {
        method: "post",
        data: formData,
        url: "/notifications/push",
      },
      {
        onSuccess: (resp) => {
          setFormData({
            title: "",
            description: "",
            discount: "",
            tags: [],
            batch: "",
            tagInput: "",
            link: "",
          });

          //console.log(resp);
          toast.success("Offer added");
        },
        onError: (e) => {
          //console.log(e);
          toast.error("error");
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
        url: `/notification/discount/delete/${id}`,
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
  const headerProps = {
    heading: "Add Special Offer",
    hideSearch: true,
    btnText: "← Back",
    redirectURL: "/notification",
  };

  const multiValueProps = {
    label: "Tags",
    name: "tagInput",
    placeholder: "add tag",
    formData,
    valueArray: formData.tags,
    valueArrayString: "tags",
    valueInput: formData.tagInput,
    setFormData,
    onchange: handleChange,
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 font-sans"> */}
      <ListingPageHeader props={headerProps} />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl   mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
          >
            {/* Title */}
            <div>
              <label className="font-medium">Title*</label>
              <input
                disabled={isPending}
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
              <label className="font-medium">Description*</label>
              <textarea
                disabled={isPending}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none mt-1 p-2 border rounded-lg"
                placeholder="You just unlocked a special 35% discount..."
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="font-medium">Discount (%)*</label>
              <input
                disabled={isPending}
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


            <div>
              <label className="font-medium">Batch*</label>
              <select
                disabled={isPending}
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required
              >
                <option value="">Select batch</option>
                {batchesLoading ? (
                  <option value="">Fetching Batches...</option>
                ) : (
                  batchNames?.batchNames.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <MultipleValues {...multiValueProps} />

            {/* Expires In */}
            <div>
              <label className="font-medium">Link*</label>
              <input
                disabled={isPending}
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="https://example.com/offer"
                required
              />
            </div>



            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold${isPending ? "opacity-70 cursor-not-allowed" : ""
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
                      title={n.description}
                      key={index}
                      className={`border relative border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition
                          ${deletingId === n._id ? "animate-pulse" : ""}
                          `}
                    >
                      <p className="text-xs text-blue-500 font-medium mb-1">
                        {n.discount}% OFF
                      </p>
                      <p
                        title={n.title}
                        className="text-sm font-semibold text-gray-800"
                      >
                        {n.title.slice(0, 40)}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        {n?.link && <a className="text-blue-600 cursor-pointer underline" target="__blank" href={n.link}>Link</a>}
                      </div>
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
}
