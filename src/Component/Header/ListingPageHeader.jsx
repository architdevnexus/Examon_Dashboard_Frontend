import { useNavigate } from "react-router-dom";

const ListingPageHeader = ({
  props: {
    heading,
    searchTerm,
    hideSearch = false,
    hideBtn = false,
    reviewBtns = false,
    active = null,
    setActive = false,
    setSearchTerm,
    btnText,
    redirectURL,
    placeholder,
  },
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex   items-center border-b justify-between mb-6 pb-2 ">
      <h1 className="text-2xl font-semibold text-gray-800">{heading}</h1>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          hidden={hideSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 shadow-sm border outline-none border-gray-200 focus:border-gray-500 rounded-lg "
        />
        {reviewBtns ? (
          <div className="flex gap-3">
            <button
              onClick={() => setActive("active")}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg  hover:bg-green-700"
            >
              Approved
            </button>
            <button
              onClick={() => setActive("reject")}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg  hover:bg-red-700"
            >
              Rejected
            </button>
            <button
              onClick={() => setActive("pending")}
              className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg  hover:bg-yellow-700"
            >
              Pending
            </button>
          </div>
        ) : (
          <button
            hidden={hideBtn}
            onClick={() => {
              navigate(redirectURL);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingPageHeader;
