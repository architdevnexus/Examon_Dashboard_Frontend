import { useState } from "react";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import { useNavigate } from "react-router-dom";
import MentorCard from "../../Component/Cards/MentorCard";
import Loader from "../../Component/Loader";

import { toast } from "react-toastify";
import MentorDetailsModal from "./MentorPopUp";
import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";

function Mentors() {
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState("");

  const [selectedMentor, setSelectedMentor] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: mentors,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["mentor"],
    handlerProps: {
      url: "/mentors",
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["mentor"],
  }); // delete exam

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  console.log(mentors);

  const filteredMentors = mentors.data.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headerProps = {
    heading: "All Mentors",
    placeholder: "Search Mentor",
    btnText: "+ Add Mentor",
    searchTerm,
    setSearchTerm,
    redirectURL: "/mentors/add",
  };

  const onDelete = ({ id }) => {
    const isConfirmed = confirm("Confirm to delete the mentor");

    if (!isConfirmed) return;

    console.log(id);
    setDeletingId(id);

    mutate(
      {
        method: "delete",
        url: `/mentors/delete/${id}`,
      },
      {
        onSuccess: (resp) => {
          console.log(resp);
          setDeletingId(null);
          toast.success("Mentor deleted");
        },
        onError: (e) => {
          console.log(e);
          toast.success("error");

          setDeletingId(null);
        },
      }
    );
  };
  const onEdit = ({ id }) => {
    console.log("edit", id);
    if (!id) {
      toast.error("Id not found");
      return;
    }

    navigate(`/mentors/update/${id}`);
  };

  const onView = (mentor) => setSelectedMentor(mentor);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 font-sans">
      {/* Header */}
      <ListingPageHeader props={headerProps} />
      {/* Grid of mentor Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              onDelete={onDelete}
              isDeleting={deletingId === mentor._id}
              onEdit={onEdit}
              onView={onView}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No mentors found.
          </p>
        )}
        {selectedMentor && (
          <MentorDetailsModal
            mentor={selectedMentor}
            onClose={() => setSelectedMentor(null)}
          />
        )}
      </section>
    </div>
  );
}

export default Mentors;
