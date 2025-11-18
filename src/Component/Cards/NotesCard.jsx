import { FaFilePdf, FaRegEye } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useDeleteNotes } from "../../hooks/useStudyMaterial";
import { toast } from "react-toastify";

const NotesCard = ({ note, cid }) => {
  const { mutate, isPending } = useDeleteNotes();

  const onDelete = (id) => {
    if (!id) {
      toast.error("id not found");
      return;
    }
    const isConfirmed = confirm("Confirm to delete this note");
    if (!isConfirmed) return;

    mutate(
      { id, cid },
      {
        onSuccess: (resp) => {
          console.log(resp);
          toast.success(resp.message);
        },
        onError: (e) => {
          console.log(e);
          toast.error(e.response.data.message);
        },
      }
    );
  };

  return (
    <div
      style={{
        cursor: isPending ? "not-allowed" : "pointer",
      }}
      className={`bg-white shadow-md   rounded-2xl p-5 transition border border-gray-100 flex flex-col justify-between
        ${isPending && "animate-pulse"}
        `}
    >
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-blue-600 w-5 h-5" />
            <span className="text-sm  font-semibold text-gray-700 uppercase">
              {note.title}
            </span>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 uppercase px-2 py-1 rounded-md">
            {note.language.slice(0, 2)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-400 truncate">
          Level: {note.level}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400  ">
            Last Update: {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-5 border-t pt-3 border-t-gray-400 ">
        <a
          href={note.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaRegEye className="w-4 h-4" />
          View
        </a>

        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-700 font-medium"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
