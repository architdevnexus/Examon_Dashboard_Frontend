import { useState } from "react";
import MainGrid from "../../Component/Layout/MainGrid";

import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import Loader from "../../Component/Loader";
import { useGetContent } from "../../hooks/useHooks";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useGetContent({
    keys: ["blog"],
    handlerProps: {
      url: "/blogs",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  const headerProps = {
    heading: " News, Media Gallery & Insights",
    btnText: "+ Add Blog",
    placeholder: "Search Blogs",
    searchTerm,
    setSearchTerm,
    redirectURL: "/blog/add",
  };

  const filteredBlogs = data.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm?.trim()?.toLowerCase())
  );

  return (
    <div className="min-h-screen   bg-gray-50 p-6">
      <ListingPageHeader props={headerProps} />

      {/* Blog Content */}
      <div>
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-yellow-600 text-xl py-10">
            No blog posts found.
          </div>
        ) : (
          <MainGrid blog={true} data={filteredBlogs} />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
