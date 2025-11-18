import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import { useDeleteNews, useGetNews } from "../../hooks/useLatestNews";
import Loader from "../../Component/Loader";
import NewsCard from "../../Component/Cards/NewsCard";
import { toast } from "react-toastify";
import { useGetContent } from "../../hooks/useHooks";

const NewsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["news"],
    handlerProps: {
      url: "/news/all",
    },
  });
  
  const { mutate, isPending } = useDeleteNews();

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  const filteredNews = news.data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headerProps = {
    heading: "All News",
    btnText: "+ Add News",
    searchTerm,
    placeholder: "Search News",
    setSearchTerm,
    redirectURL: "/news/add",
  };

  const onDelete = ({ id }) => {
    const isConfirmed = confirm("Confirm to delete the quiz");

    if (!isConfirmed) return;

    console.log(id);
    setDeletingId(id);

    mutate(id, {
      onSuccess: (resp) => {
        console.log(resp);
        setDeletingId(null);
        toast.success("News deleted");
      },
      onError: (e) => {
        console.log(e);
        toast.success("error");

        setDeletingId(null);
      },
    });
  };

  const onEdit = ({ id }) => {
    if (!id) {
      toast.error("Id not found");
      return;
    }

    navigate(`/news/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <ListingPageHeader props={headerProps} />
      {filteredNews.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No news found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news_item, i) => (
            <NewsCard
              onDelete={onDelete}
              onEdit={onEdit}
              isDeleting={deletingId === news_item._id}
              key={i}
              news={news_item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
