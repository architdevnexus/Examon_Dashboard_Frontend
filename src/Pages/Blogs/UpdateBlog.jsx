import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useGetBlogById, useUpdateBlog } from "../../hooks/useBlog";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";
import { useParams } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";

function UpdateBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  //   const [preview, setpreview] = useState(null);

  const { data, isLoading, isError, isSuccess, error } = useGetBlogById(id);

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["blog"],
  });

  useEffect(() => {
    if ((isSuccess, data)) {
      setImg(data.featuredImg);
      setTitle(data.title);
      setContent(data.blogContent);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return;
  }

  const handleSubmit = async () => {
    console.log(img, title, content);
    const formData = new FormData();
    formData.append("featuredImage", img);
    formData.append("title", title);
    formData.append("blogContent", content);

    mutate(
      { id, data: formData, url: `/blogs/update/${id}` },
      {
        onSuccess: (resp) => {
          console.log(resp);
          setTitle("");
          setImg(null);
          setContent("");
          toast.success("Blog Updated");
        },
        onError: (e) => {
          console.log(e);
          toast.error(e.response.data.message);
        },
      }
    );
  };

  return (
    <div className="card p-[2rem]">
      <div className="flex items-center border-b justify-between  pb-2 ">
        <h1 className="text-2xl font-semibold text-gray-800">Update Blogs</h1>
      </div>

      <div className="flex my-3 ">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={
            (e) => setImg(e.target.files[0])
            // setpreview(URL.createObjectURL(img));
          }
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
        {isPending ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
}

export default UpdateBlog;
