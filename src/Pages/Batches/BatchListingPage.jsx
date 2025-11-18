import { useState } from "react";
import BatchCard from "../../Component/Cards/BatchCard";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import {
  useDeleteBatch,
  useDeleteBatchCategory,
  useGetBatch,
} from "../../hooks/useBatch";
import Loader from "../../Component/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { useGetContent } from "../../hooks/useHooks";

export default function BatchListingPage() {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: BatchResp,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["batch"],
    handlerProps: {
      url: "/live/batches",
    },
  });

  const { mutate } = useDeleteBatch();

  const { mutate: deleteCategory, isPending } = useDeleteBatchCategory();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error}</div>;

  const filteredCourses = BatchResp.categories
    .map((category) => ({
      ...category,
      batches: category.batches.filter(
        (c) =>
          c.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.batchCategory
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.batches.length > 0);

  const headerProps = {
    heading: "All Batches",
    btnText: "+ Add Batch",
    searchTerm,
    setSearchTerm,
    placeholder: "Search Batchs",
    redirectURL: "/batch/add",
  };

  const handleDelete = ({ cid, id }) => {
    const isConfirmed = confirm("Confirm to Delete.");

    if (!isConfirmed) {
      toast.warn("Id not found");
      return;
    }

    setDeletingId(id);

    mutate(
      { cid, id },
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

  const handleUpdate = ({ cid, id }) => {
    console.log(id);
    if (!id) {
      alert("fd");
      toast.warn("Id is missing");
      return;
    }
    navigate(`/batch/update/${cid}/${id}`);
  };

  const onDeleteCategory = (id) => {
    console.log(id);
    const isConfirmed = confirm(
      "Deleting the category will also delete its batches."
    );

    if (!isConfirmed) return;

    deleteCategory(id, {
      onSuccess: (resp) => {
        console.log(resp);
        toast.success(resp.message);
      },
      onError: (e) => {
        console.log(e);
        toast.error(e.response.data.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ListingPageHeader props={headerProps} />

      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No batches available.
        </p>
      ) : (
        filteredCourses.map((category, index) => (
          <div key={index}>
            {category?.batchCategory && (
              <div className="flex justify-between px-2 border-b   items-center my-2">
                <h3 className="text-2xl py-2">{category.batchCategory}</h3>
                {!isPending ? (
                  <MdDelete
                    size={30}
                    className="bg-red-500   text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition"
                    title="Delete entire category"
                    onClick={() => onDeleteCategory?.(category._id)}
                  />
                ) : (
                  <MoonLoader color="#003e68" size={20} />
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.batches.map((batch, i) => (
                <BatchCard
                  key={i}
                  cId={category._id}
                  batch={batch}
                  onDelete={handleDelete}
                  onEdit={handleUpdate}
                  isDeleting={deletingId === batch._id}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
