import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { MoonLoader } from "react-spinners";

const ActionBtns = ({
  hovered,
  isDeleting,
  id,
  cid = null,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className={`absolute top-3 right-3 z-49 flex flex-col items-center gap-3 rounded-full bg-gray-100/80 backdrop-blur-sm p-2 transition-all duration-300 ${
        hovered ? "w-10 opacity-100  " : "h-10 w-10 opacity-20"
      } overflow-hidden`}
    >
      {!hovered ? (
        <MdMoreVert size={26} className="text-black rounded-full " />
      ) : isDeleting ? (
        <MoonLoader color="#003e68" size={20} />
      ) : (
        <>
          <MdEdit
            size={30}
            className="bg-blue-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-600 transition"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.({ cid, id });
            }}
          />
          <MdDelete
            size={30}
            className="bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.({ cid, id });
            }}
          />
        </>
      )}
    </div>
  );
};

export default ActionBtns;
