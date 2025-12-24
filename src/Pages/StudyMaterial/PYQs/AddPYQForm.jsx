import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../../hooks/useHooks.js";
import InputField from "../../../Component/Input/InputField.jsx"; // adjust path if needed

const AddPyqForm = () => {
  const [formData, setFormData] = useState({
    pyqCategory: "",
    title: "",
    year: "",
    pdf: null,
  });

  const fileRef = useRef(null);
  //  Mutation for form submission
  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["PYQ"],
  });

  //   Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pdf") {
      const file = files?.[0] ?? null;

      if (file.type !== "application/pdf") {
        toast.error("Please select a valid PDF file.");
        if (fileRef.current) fileRef.current.value = null;
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB.");
        if (fileRef.current) fileRef.current.value = null;
        return;
      }

      setFormData((prev) => ({ ...prev, pdf: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //   Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (key !== "pdf" && !formData[key].trim()) {
        return toast.warn(`Please fill the ${key} field!`);
      }
    }
    if (!formData.pdf) return toast.warn("Please select a PDF file!");

    const data = new FormData();
    data.append("pyqCategory", formData.pyqCategory);
    data.append("title", formData.title);
    data.append("year", String(formData.year?.split(",").map((y) => y.trim())));
    data.append("pdf", formData.pdf);

    mutate(
      {
        url: "/pyq/add",
        data,
        method: "POST",
      },
      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success(resp?.message || "PYQ uploaded successfully");
          setFormData({
            pyqCategory: "",
            title: "",
            year: "",
            pdf: null,
          });
          if (fileRef.current) fileRef.current.value = null;
        },
        onError: (e) => {
          console.log(e);
          toast.error(e.response.data.message || e.message);
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload PYQ File
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PYQ Category */}
        <InputField
          label="PYQ Category"
          name="pyqCategory"
          disabled={isPending}
          type="text"
          value={formData.pyqCategory}
          onChange={handleChange}
          placeholder="e.g. PYQ"
          required
        />

        {/* Title */}
        <InputField
          label="Title"
          disabled={isPending}
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. English"
          required
        />

        {/* Year */}
        <InputField
          label="Year"
          disabled={isPending}
          name="year"
          type="type"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g. 2024, 2025"
          required
        />
        {/* PDF Upload */}
        <InputField
          label="Upload PDF"
          name="pdf"
          type="file"
          disabled={isPending}
          id="pdf"
          ref={fileRef}
          accept="application/pdf"
          onChange={handleChange}
          inputClassName="w-full"
          required
        />

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
