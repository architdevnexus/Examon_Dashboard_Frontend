import React, { useState } from "react";
import axios from "axios";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    message: "",
    type: "success",
    redirectURI: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const token = localStorage.getItem("token");
      console.log("Posting to backend:", "http://194.238.18.1:3004/api/notification/create");
      console.log("Payload:", formData);
      console.log("Token:", token);

      const res = await axios.post(
        "http://194.238.18.1:3004/api/notification/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(res.data.message || "Notification sent successfully!");
      setFormData({
        label: "",
        message: "",
        type: "success",
        redirectURI: "",
      });
    } catch (err) {
     
      setResponseMessage(
        err.response?.data?.message || `Error ${err.response?.status}: ${err.response?.statusText}`
      );
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = ["success", "error", "info", "warning"];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Notification</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Label</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Enter notification label"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter notification message"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Redirect URI</label>
          <input
            type="text"
            name="redirectURI"
            value={formData.redirectURI}
            onChange={handleChange}
            placeholder="Enter redirect URL (optional)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-4 text-center font-medium ${responseMessage.toLowerCase().includes("error") ? "text-red-600" : "text-green-600"}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default NotificationForm;
