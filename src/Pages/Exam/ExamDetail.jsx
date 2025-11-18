import { useNavigate } from "react-router-dom";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import { useState } from "react";

import Loader from "../../Component/Loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";

function ExamDetail() {
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: exams,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["exams"],
    handlerProps: {
      url: "/exams/details",
    },
  }); // get exams

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["exams"],
  }); // delete exams

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  const filteredExams = exams.flatMap(
    (examC) =>
      examC.examDetails?.filter((exam) =>
        exam?.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
  );

  const headerProps = {
    heading: "All Exams",
    placeholder: "Search Exam...",
    btnText: "+ Add Exam",
    searchTerm,
    setSearchTerm,
    redirectURL: "/exams/add",
  };

  const onDelete = (id) => {
    const isConfirmed = confirm("Confirm to delete the quiz");

    if (!isConfirmed) return;

    console.log(id);
    setDeletingId(id);

    mutate(
      {
        method: "delete",
        url: `/exams/details/delete/${id}`,
      },
      {
        onSuccess: (resp) => {
          console.log(resp);
          setDeletingId(null);
          toast.success("Exam  deleted");
        },
        onError: (e) => {
          setDeletingId(null);
          console.log(e);
          toast.success("error");
          // isPending = false;
        },
      }
    );
  };
  const onEdit = (id) => {
    if (!id) {
      toast.error("Id not found");
      return;
    }

    navigate(`/exams/update/${id}`);
  };
  const thClass = "py-3 px-4 text-sm font-bold text-gray-700";

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 font-sans">
      {/* Header */}
      <ListingPageHeader props={headerProps} />

      {/* Exam Table */}
      <section className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-200 bg-white shadow rounded-b-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className={thClass}>S.No.</th>
              <th className={thClass}>Exam Title</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam, index) => (
                <tr
                  key={exam._id}
                  className="border-t hover:bg-gray-200  rounded-2xl transition"
                >
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {index + 1}
                  </td>

                  <td className="py-3 px-4 text-gray-800">{exam.title}</td>

                  <td className="py-3 px-4 flex items-center justify-center gap-3">
                    {isPending && deletingId === exam._id ? (
                      <BarLoader color="red" width={80} height={2} />
                    ) : (
                      <>
                        <button
                          onClick={() => navigate(`/exams/${exam._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => onEdit(exam._id)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => onDelete(exam._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No exams found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ExamDetail;
