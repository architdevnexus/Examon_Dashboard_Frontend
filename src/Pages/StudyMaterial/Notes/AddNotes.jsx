import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../../hooks/useHooks.js";
import InputField from "../../../Component/Input/InputField.jsx"; // adjust path if needed

const AddNotes = () => {
  const [formData, setFormData] = useState({
    notesCategory: "",
    title: "",
    language: "",
    level: "",
    pdf: null,
  });

  const fileRef = useRef(null);
  // Mutation for form submission
  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["notes"],
  });

  // Handle input changes (text/select)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle PDF selection and validation
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setFormData((prev) => ({ ...prev, pdf: null }));
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a valid PDF file");
      if (fileRef.current) fileRef.current.value = null;
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF must be less than 10MB");
      if (fileRef.current) fileRef.current.value = null;
      return;
    }

    setFormData((prev) => ({ ...prev, pdf: file }));
  };

  // Handle form submit
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
        data,
        method: "POST",
      },
      {
        onSuccess: (resp) => {
          toast.success(
            resp?.response?.data?.message || "Notes uploaded successfully"
          );
          setFormData({
            notesCategory: "",
            title: "",
            language: "",
            level: "",
            pdf: null,
          });
          if (fileRef.current) fileRef.current.value = null;
        },
        onError: (e) => {
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
        {/* Notes Category */}
        <InputField
          label="Notes Category"
          name="notesCategory"
          disabled={isPending}
          type="text"
          value={formData.notesCategory}
          onChange={handleChange}
          placeholder="e.g. Reasoning, Quantitative Aptitude"
          required
        />

        {/* Title */}
        <InputField
          disabled={isPending}
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. English"
          required
        />

        {/* Language / Medium */}
        <InputField
          label="Medium"
          disabled={isPending}
          name="language"
          type="text"
          value={formData.language}
          onChange={handleChange}
          placeholder="e.g. English, Hindi"
          required
        />

        {/* Level (select) */}
        <InputField
          label="Level"
          disabled={isPending}
          name="level"
          type="select"
          value={formData.level}
          onChange={handleChange}
          options={[
            { value: "", label: "Select level", disabled: true },
            { value: "limited_offer", label: "Easy" },
            { value: "flash_banner", label: "Medium" },
            { value: "premium_banner", label: "Hard" },
          ]}
          required
        />

        {/* PDF Upload */}
        <InputField
          label="Upload PDF"
          disabled={isPending}
          name="pdf"
          type="file"
          ref={fileRef}
          accept="application/pdf"
          onChange={handleFileChange}
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

export default AddNotes;
