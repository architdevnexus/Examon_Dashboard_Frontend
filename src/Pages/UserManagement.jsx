  import { useState, useMemo } from "react";
  import ListingPageHeader from "../Component/Header/ListingPageHeader";
  import { useGetContent } from "../hooks/useHooks";
  import Loader from "../Component/Loader";
  import UserPopUp from "../Component/Popups/UserPopUp";

  export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState({ user: {}, isOpen: false });
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useGetContent({
      keys: ["users", page],
      handlerProps: {
        url: `http://194.238.18.1:3004/api/users/all?page=${page}`,
      },
    });
    const users = Array.isArray(data?.data) ? data.data : [];
    const totalPages = data?.totalPages || 1;
    console.log(users)

    // Filtering only the current page data
    const filteredUsers = useMemo(() => {
      const t = searchTerm.trim().toLowerCase();
      return users.filter(
        (u) =>
          u.fullname.toLowerCase().includes(t) ||
          u.email.toLowerCase().includes(t) ||
          u.phone.toLowerCase().includes(t)
      );
    }, [users, searchTerm]);

    const headerProps = {
      heading: "All Users",
      searchTerm,
      setSearchTerm,
      hideBtn: true,
      placeholder: "Search Name, Email, Ph...",
    };

    if (isLoading) return <Loader />;
    if (isError) {
      console.error(error);
      return <div>Error loading users</div>;
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6 pb-0">
        <ListingPageHeader props={headerProps} />

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="max-h-[470px] overflow-y-auto">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-sm font-bold text-gray-700 w-20">
                    S.No.
                  </th>
                  <th className="py-3 px-4 text-sm font-bold text-gray-700">
                    Full Name
                  </th>
                  <th className="py-3 px-4 text-sm font-bold text-gray-700">
                    Phone Number
                  </th>
                  <th className="py-3 px-4 text-sm font-bold text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-4 text-sm font-bold text-gray-700 w-24">
                    View Profile
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No user found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((value, idx) => (
                    <tr key={value._id} className="hover:bg-gray-200 transition">
                      <td className="py-3 px-4 text-gray-600">
                        {(page - 1) * users.length + idx + 1}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {value.fullname}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{value.phone}</td>
                      <td className="py-3 px-4 text-gray-800">{value.email}</td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() =>
                            setModalOpen({ isOpen: true, user: value })
                          }
                          className="text-blue-600 cursor-pointer hover:text-blue-800 underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-3 py-1 rounded-md text-sm ${page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              ←
            </button>

            <p className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </p>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-3 py-1 rounded-md text-sm ${page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              →
            </button>
          </div>
        </div>

        {modalOpen.isOpen && (
          <UserPopUp modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </div>
    );
  }
