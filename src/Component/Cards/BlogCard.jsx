import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ActionBtns from "../ActionBtns";
import { memo, useMemo } from "react";

const BlogCard = ({
  _id,
  title = "Untitled Blog",
  featuredImage,
  blogContent = "",
  createdAt,
  blogCategory,
  onDelete,
  onUpdate,
  isDeleting = false,
}) => {
  const formattedDate = useMemo(() => {
    if (!createdAt) return "Unknown";
    return new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [createdAt]);

  const snippet = useMemo(
    () => blogContent.slice(0, 500),
    [blogContent]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col gap-2.5 rounded-md shadow-md
        ${isDeleting ? "pointer-events-none opacity-70 animate-pulse" : ""}
      `}
    >
      <Link to={`/blog/${_id}`} className="block">
        {/* Image */}
        <div className="relative h-[200px] overflow-hidden rounded-md">
          <motion.img
            src={featuredImage}
            alt={title}
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 p-2 text-lg font-semibold text-slate-800
                        group-hover:text-[#F68537] group-hover:underline">
          <p className="line-clamp-2">{title}</p>
          <FaArrowUpRightFromSquare size={12} />
        </div>

        {/* Snippet */}
        <p
          className="px-2 text-sm text-gray-600 line-clamp-4"
          dangerouslySetInnerHTML={{ __html: snippet }}
        />

        {/* Footer */}
        <div className="flex justify-between items-center p-2 text-sm text-gray-500">
          <span>{formattedDate}</span>
          {blogCategory && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
              {blogCategory}
            </span>
          )}
        </div>
      </Link>

      <ActionBtns
        id={_id}
        hovered={!isDeleting}
        isDeleting={isDeleting}
        onDelete={onDelete}
        onEdit={onUpdate}
      />
    </motion.div>
  );
};

export default memo(BlogCard);
