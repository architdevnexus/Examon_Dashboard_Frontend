const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex  
     justify-center mt-6 space-x-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => {
            handlePageChange(i + 1);
            scrollTo(0, 750);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
