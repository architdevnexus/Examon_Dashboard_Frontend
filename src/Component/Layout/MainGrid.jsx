import { useEffect, useState } from "react";

import BlogCard from "../Cards/BlogCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";

const MainGrid = ({ data, blog }) => {
  const navigate = useNavigate();
  const itemsPerPage = 12;
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate } = useUpdateOrDeleteContent({
    keys: ["blog"],
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to first page if data changes
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg py-10">
        No results found.
      </div>
    );
  }

  // const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const handlePageChange = (pageNum) => {
  //   setCurrentPage(pageNum);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const handleDelete = ({ id }) => {
    const isConfirmed = confirm("Confirm to Delete.");

    if (!isConfirmed) {
      return;
    }
    if (!id) {
      toast.warn("Id not found");
      return;
    }
    setDeletingId(id);

    mutate(
      { method: "delete", url: `/blogs/delete/${id}` },
      {
        onSuccess: (data) => {
          console.log(data);
          setDeletingId(null);
          toast.success("Batch deleted");
        },
        onError: (e) => {
          console.log(e);
          setDeletingId(null);
          toast.error("Error");
        },
      }
    );

    return;
  };

  const handleUpdate = ({ id }) => {
    console.log(id);
    if (!id) {
      toast.warn("Id is missing");
      return;
    }
    navigate(`/blog/update/${id}`);
  };

  return (
    <>
      <div className="grid   grid-cols-1 lg:overflow-visible overflow-x-clip sm:grid-cols-1 my-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((dev) => (
          <BlogCard
            isDeleting={deletingId == dev._id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            key={dev._id}
            {...dev}
          />
        ))}
      </div>
      {/* <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      /> */}
    </>
  );
};

export default MainGrid;
