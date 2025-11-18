import { useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";

export default function AddExamEditor() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["exams"],
  }); // add exam

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

  const handleSubmit = async () => {
    mutate(
      {
        method: "post",
        url: "/exams/details",
        data: { title, Content: content, examDetailsCategory: category },
      },

      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success("Exam Added");
          setTitle("");
          setContent("");
          setCategory("");
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
        <h1 className="text-2xl font-semibold text-gray-800">Add Exam</h1>
      </div>

      {/* Title */}
      <Input
        placeholder={"Enter Exam title"}
        title={title}
        setTitle={setTitle}
      />
      <Input
        placeholder={"Enter Exam Category"}
        title={category}
        setTitle={setCategory}
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
        {isPending ? "Adding..." : "Add Exam"}
      </button>
    </div>
  );
}

const Input = ({ title, setTitle, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full p-2 border border-gray-300  rounded mb-4"
  />
);
