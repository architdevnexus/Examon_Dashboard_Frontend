import { useState } from "react";

import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../hooks/useHooks";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    message: "",
    type: "success",
    redirectURI: "",
  });

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["notification"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        method: "post",
        url: `notification/create`,
        data: formData,
      },
      {
        onSuccess: (d) => {
          console.log("response data", d);
          setFormData({
            label: "",
            message: "",
            type: "success",
            redirectURI: "",
          });
          toast.success(d.message);
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      }
    );
  };

  const typeOptions = ["success", "error", "info", "warning"];
  const style = "w-full p-2 border border-gray-300 rounded mb-4";

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Send Notification
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Enter notification label"
            className={style}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 outline-black font-semibold mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter notification message"
            className={style}
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={style}
          >
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Redirect URI
          </label>
          <input
            type="text"
            name="redirectURI"
            value={formData.redirectURI}
            onChange={handleChange}
            placeholder="Enter redirect URL (optional)"
            className={style}
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
      </form>

      {isError && (
        <p
          className={`mt-4 text-center font-medium ${
            error.toLowerCase().includes("error")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default NotificationForm;
