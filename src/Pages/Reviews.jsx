import { useState } from "react";
import ListingPageHeader from "../Component/Header/ListingPageHeader";
import Loader from "../Component/Loader.jsx";
import { useGetReviews } from "../hooks/useReview.js";
import ReviewCard from "../Component/Cards/ReviewCard.jsx";
import { useGetContent } from "../hooks/useHooks.js";

export default function ReviewListPage() {
  const [active, setActive] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: reviews,
    isError,
    error,
    isLoading,
  } = useGetContent({
    keys: ["review"],
    handlerProps: {
      url: "/review/get",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) return <div>{error}</div>;

  const filteredReviews = reviews.data.filter((rev) => rev.status === active);

  console.log(reviews);

  const headerProps = {
    heading: "All Reviews",
    btnText: "Pending Review",
    hideSearch: true,
    hideBtn: true,
    reviewBtns: true,
    active,
    setActive,
    searchTerm,
    setSearchTerm,
    placeholder: "Search Review",
    redirectURL: "/reviews/pending",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <ListingPageHeader props={headerProps} />

        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.length === 0 ? (
            <p>No review found</p>
          ) : (
            filteredReviews.map((rev, index) => (
              <ReviewCard key={index} review={rev} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
