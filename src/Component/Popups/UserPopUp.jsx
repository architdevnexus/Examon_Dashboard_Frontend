import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserPopUp = ({ setModalOpen, modalOpen }) => {
  const navigate = useNavigate();
  const { user } = modalOpen;

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl animate-scaleIn">
        {/* Close button */}
        <button
          onClick={() => setModalOpen({ isOpen: false, user: {} })}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <MdCancel size={24} />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Detail
        </h2>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 text-gray-700">
          <div className="flex items-center gap-4">
            <img
              src={user.profileImage}
              alt={user.fullname}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.fullname}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Preferred Course:</span>{" "}
            {user.preferedCourse}
          </p>
          <p>
            <span className="font-semibold">Last Login:</span>{" "}
            {new Date(user.lastLogin).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Active:</span>{" "}
            {user.isActive ? "Yes" : "No"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              setModalOpen({ isOpen: false, user: {} });
              navigate(`/user-quizzes/${user._id}`);
            }}
            className="px-4 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Attempted Quizzes
          </button>
          <button
            onClick={() => {
              setModalOpen({ isOpen: false, user: {} });
              navigate(`/user-reviews/${user._id}`);
            }}
            className="px-4 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Reviews Given
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopUp;
