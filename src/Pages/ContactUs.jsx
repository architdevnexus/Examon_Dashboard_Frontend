import { useState, useMemo } from "react";
import { MdCancel } from "react-icons/md";
import ListingPageHeader from "../Component/Header/ListingPageHeader";
import { useGetContent } from "../hooks/useHooks";
import Loader from "../Component/Loader";

export default function ContactDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState({ message: "", isOpen: false });
  const [page, setPage] = useState(1);

  const limit = 10; // items per page

  const { data, isLoading, isError } = useGetContent({
    keys: ["contactUs", page],
    handlerProps: {
      url: `https://backend.palgharhome.com/api/contact-us?page=${page}&limit=${limit}`,
    },
  });

  // Hooks must be called at the top level
  const contacts = Array.isArray(data?.contacts) ? data.contacts : [];
  const totalPages = data?.totalPages || 1;

  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return contacts.filter(
      (contact) =>
        contact?.fname?.toLowerCase().includes(term) ||
        contact?.lname?.toLowerCase().includes(term) ||
        contact?.email?.toLowerCase().includes(term)
    );
  }, [contacts, searchTerm]);

  const headerProps = {
    heading: "Contact Submissions",
    searchTerm,
    setSearchTerm,
    hideBtn: true,
    placeholder: "Search Name, Email...",
  };

  const thClass = "py-3 px-4 text-sm font-bold text-gray-700";

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading contact submissions</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ListingPageHeader props={headerProps} />

      <table className="w-full border border-gray-200 bg-white shadow rounded-b-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className={thClass}>Serial No.</th>
            <th className={thClass}>Full Name</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Message</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td className="font-normal text-center py-2" colSpan={6}>
                No record found
              </td>
            </tr>
          ) : (
            filteredContacts.map((contact, idx) => (
              <tr
                key={contact._id || idx}
                className="border-t hover:bg-gray-200 transition"
              >
                <td className="py-3 px-4 text-gray-700 text-sm">
                  {(page - 1) * limit + idx + 1}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {contact.fname} {contact.lname}
                </td>
                <td className="py-3 px-4 text-gray-800">{contact.email}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      setModalOpen({ isOpen: true, message: contact.message })
                    }
                    className="text-blue-600 cursor-pointer hover:text-blue-800 underline"
                  >
                    View
                  </button>
                </td>
                <td className="py-3 px-4 text-gray-800">{contact.status}</td>
                <td className="py-3 px-4 text-gray-800">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-100 rounded-b-lg">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-3 py-1 rounded-md text-sm ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          ← Previous
        </button>

        <p className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </p>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-3 py-1 rounded-md text-sm ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Modal */}
      {modalOpen.isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl animate-scaleIn">
            <button
              onClick={() => setModalOpen({ isOpen: false, message: "" })}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <MdCancel size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Message Details
            </h2>
            <p className="text-gray-700 leading-relaxed">{modalOpen.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
