import { FaFilePdf, FaRegEye } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";
const PyqCard = ({ cid, pyq }) => {
  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["PYQ"],
  }); //

  const onDelete = (id) => {
    if (!id) {
      toast.error("id not found");
      return;
    }
    const isConfirmed = confirm("Confirm to delete this PYQ");
    if (!isConfirmed) return;

    mutate(
      { url: `/pyq/delete/${cid}/${id}`, method: "delete" },
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
      className={`bg-white shadow-md hover:shadow-lg rounded-2xl p-5 transition border border-gray-100 flex flex-col justify-between ${
        isPending && "animate-pulse"
      } `}
    >
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-blue-600 w-5 h-5" />
            <span className="text-sm font-semibold text-gray-700 uppercase">
              {pyq.pyqCategory}
            </span>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            {pyq.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {pyq.title}
        </h3>
        <h3 className="text-xs font-thin text-gray-500 truncate">
          {new Date(pyq.createdAt).toLocaleDateString()}
        </h3>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-5 border-t pt-3">
        <a
          href={pyq.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaRegEye className="w-4 h-4" />
          View
        </a>

        <button
          disabled={isPending}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
          onClick={() => onDelete(pyq._id)}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PyqCard;
