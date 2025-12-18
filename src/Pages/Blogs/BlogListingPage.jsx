import { useState, useMemo } from "react";
import MainGrid from "../../Component/Layout/MainGrid";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import Loader from "../../Component/Loader";
import { useGetContent } from "../../hooks/useHooks";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetContent({
    keys: ["blog"],
    handlerProps: { url: "/blogs" },
  });

  /* ----------------------------------
     Flatten + Filter Blogs
  ---------------------------------- */
  const blogs = useMemo(() => {
    const categories = data?.categories ?? [];
    const search = searchTerm.trim().toLowerCase();

    return categories.flatMap((category) =>
      (category.blogs ?? [])
        .filter((blog) => {
          if (!search) return true;

          return (
            blog.title?.toLowerCase().includes(search) ||
            category.blogCategory?.toLowerCase().includes(search)
          );
        })
        .map((blog) => ({
          ...blog,
          blogCategory: category.blogCategory,
        }))
    );
  }, [data?.categories, searchTerm]);

  if (isLoading) return <Loader />;
  if (isError) return null;

  const headerProps = {
    heading: " News, Media Gallery & Insights",
    btnText: "+ Add Blog",
    placeholder: "Search Blogs",
    searchTerm,
    setSearchTerm,
    redirectURL: "/blog/add",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ListingPageHeader props={headerProps} />

      <div>
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500">
            No blog posts found.
          </div>
        ) : (
          <MainGrid blog data={blogs} />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
