import { useRef, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useAddBlog } from "../../hooks/useBlog";
import { toast } from "react-toastify";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");

  const fileRef = useRef();

  const { mutate, isPending } = useAddBlog();

  const handleSubmit = async () => {
    console.log(img, title, content);
    const formData = new FormData();
    formData.append("featuredImage", img);
    formData.append("title", title);
    formData.append("blogContent", content);

    mutate(formData, {
      onSuccess: (resp) => {
        console.log(resp);
        toast.success("Blog Added");
        setTitle("");
        setImg(null);
        setContent("");
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: (e) => {
        console.log(e);
        toast.error(e.response.data.message);
      },
    });
  };

  return (
    <div className="card p-[2rem]">
      <div className="flex items-center border-b justify-between  pb-2 ">
        <h1 className="text-2xl font-semibold text-gray-800">Examon Blogs</h1>
      </div>

      <div className="flex my-3 ">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <input
          type="file"
          ref={fileRef}
          name="img"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          className="w-full border border-gray-300 rounded-lg p-1 cursor-pointer file:cursor-pointer  text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          required
        />
      </div>
      {img && (
        <img
          src={URL.createObjectURL(img)}
          alt="Featured"
          className="mb-4 max-h-40 rounded"
        />
      )}

      {/* Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300  rounded mb-4"
      />

      {/* Editor */}
      <Editor
        value={content}
        onTextChange={(e) => setContent(e.htmlValue)}
        style={{ height: "300px" }}
      />

      <button
        onClick={handleSubmit}
        style={{
          cursor: isPending ? "not-allowed" : "pointer",
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-4"
      >
        {isPending ? "Adding..." : "Add Blog"}
      </button>
    </div>
  );
}
