import { useRef, useState } from "react";

import { useAddPYQ } from "../../../hooks/useStudyMaterial.js";
import { toast } from "react-toastify";

const AddPyqForm = () => {
  const [formData, setFormData] = useState({
    pyqCategory: "",
    title: "",
    year: "",
    pdf: null,
  });

  const fileRef = useRef(null);
  //  Mutation for form submission
  const { mutate, isPending } = useAddPYQ();

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
    data.append("pyqCategory", formData.pyqCategory);
    data.append("title", formData.title);
    data.append("year", formData.year);
    data.append("pdf", formData.pdf);

    mutate(data, {
      onSuccess: (resp) => {
        console.log(resp);
        toast.success(resp.message);
        setFormData({
          pyqCategory: "",
          title: "",
          year: "",
          pdf: null,
        });
        fileRef.current = null;
      },
      onError: (e) => {
        console.log(e);
        toast.error(e.message);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload PYQ File
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PYQ Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PYQ Category
          </label>
          <input
            type="text"
            name="pyqCategory"
            value={formData.pyqCategory}
            onChange={handleChange}
            placeholder="e.g. PYQ"
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

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2026"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
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

export default AddPyqForm;
