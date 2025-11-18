import { useState } from "react";
import ListingPageHeader from "../../../Component/Header/ListingPageHeader";
import NotesCard from "../../../Component/Cards/NotesCard";
import { useGetNotes } from "../../../hooks/useStudyMaterial";
import Loader from "../../../Component/Loader";
import { useGetContent } from "../../../hooks/useHooks";

function NotesListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["notes"],
    handlerProps: {
      url: "/notes/all",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }
  // console.log(data);

  const filteredNotes = notes.data
    .map((category) => ({
      ...category,
      notes: category.notes.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.notes.length > 0);

  const headerProps = {
    heading: "All Notes",
    btnText: "+ Add Notes",
    searchTerm,
    placeholder: "Search Notes",
    setSearchTerm,
    redirectURL: "/studymaterial/notes/add",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <ListingPageHeader props={headerProps} />

      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Notes not found.</p>
      ) : (
        filteredNotes.map((note, index) => (
          <div key={index}>
            <h3 className="text-2xl py-2 border-b my-2">
              {note.notesCategory}
            </h3>
            {/* notes Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {note.notes.map((item, i) => (
                <NotesCard key={i} cid={note._id} note={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotesListingPage;
