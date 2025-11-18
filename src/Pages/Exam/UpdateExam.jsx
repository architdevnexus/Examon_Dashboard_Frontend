import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader";
import {
  useGetContentById,
  useUpdateOrDeleteContent,
} from "../../hooks/useHooks";

export default function UpdateExamEditor() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, isSuccess, isError, error } = useGetContentById({
    id,
    keys: ["exams", id],
    handlerProps: {
      url: `/exams/details/${id}`,
    },
  }); // get exam

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["exams"],
  }); // update exam

  useEffect(() => {
    if (isSuccess && data) {
      setTitle(data.title);
      setContent(data.Content);
    }
  }, [isSuccess, data]);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  // console.log(data);
  const handleImagePaste = async (e) => {
    const clipboardItems = e.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        const url = await uploadImageToServer(file);

        const imgTag = `<img src="${url}" alt="image" style="max-width:100%;" />`;
        setContent((prev) => prev + imgTag);

        e.preventDefault();
        break;
      }
    }
  };

  const handleSubmit = () => {
    mutate(
      {
        method: "patch",
        data: { title, Content: content },
        url: `/exams/details/update/${id}`,
      },
      {
        onSuccess: (resp) => {
          setTitle("");
          setContent("");
          toast.success("Exam updated");
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <div className="card p-[2rem]">
      <div className="flex items-center border-b justify-between mb-3 pb-2 ">
        <h1 className="text-2xl font-semibold text-gray-800">
          Update Exam Details
        </h1>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter Exam title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300  rounded mb-4"
      />

      {/* Editor */}
      <Editor
        value={content}
        onTextChange={(e) => setContent(e.htmlValue)}
        onPasteCapture={handleImagePaste}
        style={{ height: "300px" }}
      />

      <button
        onClick={handleSubmit}
        disabled={isPending}
        style={{
          cursor: isPending ? "not-allowed" : "pointer",
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-4"
      >
        {isPending ? "Updating..." : "Update Exam"}
      </button>
    </div>
  );
}
