import { useState } from "react";

import ListingPageHeader from "../../../Component/Header/ListingPageHeader";
import PyqCard from "../../../Component/Cards/PYQCard";
import Loader from "../../../Component/Loader";
import { useGetContent } from "../../../hooks/useHooks";

const PYQListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: PYQs,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["PYQ"],
    handlerProps: {
      url: "/pyq",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  const filteredPYQs = PYQs.data
    .map((category) => ({
      ...category,
      questionspaper: category.questionspaper.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questionspaper.length > 0);

  // console.log(filteredPYQs);

  const headerProps = {
    heading: "All PYQs",
    btnText: "+ Add PYQ",
    searchTerm,
    placeholder: "Search PYQs",
    setSearchTerm,
    redirectURL: "/studymaterial/pyq/add",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <ListingPageHeader props={headerProps} />

      {filteredPYQs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No PYQs found.</p>
      ) : (
        filteredPYQs.map((pyq, index) => (
          <div key={index}>
            <h3 className="text-2xl py-2 border-b my-2">{pyq.pyqCategory}</h3>
            {/* pyq Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pyq.questionspaper.map((item, i) => (
                <PyqCard cid={pyq._id} key={i} pyq={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PYQListingPage;
