import { useRef, useState } from "react";

import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../../hooks/useHooks.js";

const AddNotes = () => {
  const [formData, setFormData] = useState({
    notesCategory: "",
    title: "",
    language: "",
    level: "",
    pdf: null,
  });

  const fileRef = useRef(null);
  //  Mutation for form submission
  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["notes"],
  });

  //   Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setFormData((prev) => ({ ...prev, pdf: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //   Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pdf) return alert("Please select a PDF file!");

    const data = new FormData();
    data.append("notesCategory", formData.notesCategory);
    data.append("title", formData.title);
    data.append("level", formData.level);
    data.append("language", formData.language);
    data.append("notes", formData.pdf);

    mutate(
      {
        url: "/notes/add",
        data: data,
        method: "POST",
      },
      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success(resp.message);
          setFormData({
            notesCategory: "",
            title: "",
            language: "",
            level: "",
            pdf: null,
          });
          fileRef.current = null;
        },
        onError: (e) => {
          console.log(e);
          toast.error(e.message);
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Notes File
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PYQ Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes Category
          </label>
          <input
            type="text"
            name="notesCategory"
            value={formData.notesCategory}
            onChange={handleChange}
            placeholder="e.g. Reasoning, Quantitative Aptitude"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. English"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="e.g. English, Hindi"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/*  level */}
        <div>
          <label className="font-medium">Level*</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          >
            <option value="">Select level</option>
            <option value="limited_offer">Easy</option>
            <option value="flash_banner">Medium</option>
            <option value="premium_banner">Hard</option>
          </select>
        </div>
        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PDF
          </label>
          <input
            type="file"
            name="pdf"
            id="pdf"
            ref={fileRef}
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            required
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isPending ? "Uploading..." : "Upload PYQ"}
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
