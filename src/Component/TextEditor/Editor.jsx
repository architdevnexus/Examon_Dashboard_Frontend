import { useRef, useState, useMemo } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { toast } from "react-toastify";
import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");

  const fileRef = useRef(null);

  /* ------------------ API hooks ------------------ */
  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["blog"],
  });

  const { data: BatchResp, isLoading } = useGetContent({
    keys: ["batch"],
    handlerProps: {
      url: "/live/batches",
    },
  });

  /* ------------------ Extract categories ------------------ */
  const blogCategories = useMemo(() => {
    if (!Array.isArray(BatchResp?.categories)) return [];
    return Array.from(
      new Set(BatchResp?.categories.map((item) => item.batchCategory))
    );
  }, [BatchResp?.categories]);

  /* ------------------ Submit handler ------------------ */
  const handleSubmit = () => {
    if (!title || !img || !content || !blogCategory) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("featuredImage", img);
    formData.append("title", title);
    formData.append("blogContent", content);
    formData.append("blogCategory", blogCategory); 

    mutate(
      {
        method: "post",
        data: formData,
        url: "create-blogs",
      },
      {
        onSuccess: () => {
          toast.success("Blog Added Successfully");
          setTitle("");
          setImg(null);
          setContent("");
          setBlogCategory("");
          if (fileRef.current) fileRef.current.value = "";
        },
        onError: (e) => toast.error(e.message),
      }
    );
  };

  /* ------------------ JSX ------------------ */
  return (
    <div className="card p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
        Examon Blogs
      </h1>

      {/* Featured Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <input
          type="file"
          ref={fileRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => setImg(e.target.files[0])}
          className="w-full border rounded-lg p-1 text-sm file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md hover:file:bg-blue-700"
          disabled={isPending}
          required
        />
      </div>

      {img && (
        <img
          src={URL.createObjectURL(img)}
          alt="Preview"
          className="mb-4 max-h-40 rounded shadow"
        />
      )}

      {/* Blog Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        maxLength={100}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        disabled={isPending}
        required
      />

      {/* Blog Category */}
      <select
        value={blogCategory}
        onChange={(e) => setBlogCategory(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        disabled={isLoading || isPending}
        required
      >
        <option value="">Select Blog Category</option>
        {blogCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Editor */}
      <Editor
        value={content}
        onTextChange={(e) => setContent(e.htmlValue)}
        style={{ height: "300px" }}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-5 disabled:opacity-60"
      >
        {isPending ? "Adding..." : "Add Blog"}
      </button>
    </div>
  );
}
