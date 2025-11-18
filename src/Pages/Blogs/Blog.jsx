import { useParams, useNavigate } from "react-router-dom";

import Loader from "../../Component/Loader";
import { useGetBlogById } from "../../hooks/useBlog";

export default function DedicatedBlogPage() {
  const { id } = useParams();

  const { data: blog, isLoading, isError, error } = useGetBlogById(id);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    toast.error(error.response.data.message);
    return;
  }

  return (
    <div className="min-h-screen   font-sans px-4 py-6 md:px-10">
      <div className="flex flex-col   lg:flex-row gap-8">
        {/* Main Blog */}
        <div className=" w-full rounded-xl shadow-lg overflow-hidden">
          <BlogComponent {...blog} />
        </div>
      </div>
    </div>
  );
}

function BlogComponent({ _id, title, featuredImage, createdAt, blogContent }) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <article className="p-6 sm:p-8 md:p-10 lg:p-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {title}
        </h1>
        <div className="text-gray-600 text-sm sm:text-base flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <p className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <time dateTime={createdAt}>{formattedDate}</time>
          </p>
        </div>
      </header>

      {/* Blog Image */}
      {featuredImage && (
        <div className="mb-8">
          <img
            src={featuredImage}
            alt={title}
            className="w-full max-h-[500px] object-cover rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none leading-loose text-gray-700"
        dangerouslySetInnerHTML={{
          __html: blogContent || "<p>No content available.</p>",
        }}
      />
    </article>
  );
}
