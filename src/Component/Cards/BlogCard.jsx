import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ActionBtns from "../ActionBtns";
import { useState } from "react";

const BlogCard = ({
  _id,
  title,
  featuredImage,
  createdAt,
  blogContent,
  onDelete,
  onUpdate,
  isDeleting,
}) => {
  const [hovered, setHovered] = useState(false);

  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col shadow-md relative  rounded-md gap-2.5
        ${isDeleting && "animate-pulse"}  
        `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/blog/${_id}`}>
        {/* Image */}
        <div className="relative h-[200px] rounded-md overflow-hidden flex items-center justify-center">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            src={featuredImage}
            alt={`Blog image: ${title}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <div className="text-lg p-2   font-semibold text-slate-800 hover:text-[#F68537] cursor-pointer hover:underline flex items-center gap-2">
          <p>{title}</p>
          <FaArrowUpRightFromSquare className="w-12" size={12} />
        </div>

        {/* Snippet */}
        <p
          dangerouslySetInnerHTML={{
            __html: blogContent.slice(0, 500),
          }}
          className="text-sm px-2 text-gray-600"
        ></p>

        {/* Date */}
        <p className="p-2 text-sm text-gray-500">{date}</p>
      </Link>
      <ActionBtns
        isDeleting={isDeleting}
        id={_id}
        hovered={hovered}
        onDelete={onDelete}
        onEdit={onUpdate}
      />
    </motion.div>
  );
};

export default BlogCard;
