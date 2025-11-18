import { useState } from "react";
import ListingPageHeader from "../../Component/Header/ListingPageHeader";
import { useDeleteCourse } from "../../hooks/useCourse.js";
import Loader from "../../Component/Loader";
import CourseCard from "../../Component/Cards/CourseCard.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CourseDetailsModal from "./CoursePopUp.jsx";
import { useGetContent } from "../../hooks/useHooks.js";

const CourseList = () => {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: courseData,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["course"],
    handlerProps: {
      url: "/course/all",
    },
  });

  const { mutate } = useDeleteCourse();

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  const filteredCourses = courseData.data
    .map((category) => ({
      ...category,
      courses: category.courses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.courses.length > 0);

  const headerProps = {
    heading: "All Courses",
    btnText: "+ Add Course",
    searchTerm,
    setSearchTerm,
    placeholder: "Search Course",

    redirectURL: "/course/add",
  };

  const handleDelete = ({ cid, id }) => {
    const isConfirmed = confirm("Confirm to Delete.");

    if (!isConfirmed) {
      toast.warn("Id not found");
      return;
    }

    setDeletingId(id);

    mutate(
      { cid, id },
      {
        onSuccess: (data) => {
          console.log(data);
          setDeletingId(null);
          toast.success("Course deleted");
        },
        onError: (e) => {
          console.log(e);
          setDeletingId(null);
          toast.error(e.response.data.error);
        },
      }
    );

    // isSuccess && alert("Course Deleted" + id);
    return;
  };

  const handleEdit = ({ cid, id }) => {
    if (!cid || !id) {
      toast.warn("Id is missing");
      return;
    }
    navigate(`/course/update/${cid}/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <ListingPageHeader props={headerProps} />

      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No courses found.</p>
      ) : (
        filteredCourses.map((courses1, index) => (
          <div key={index}>
            {courses1.examCategory && (
              <h3 className="text-2xl py-2 border-b my-2">
                {courses1.examCategory}
              </h3>
            )}

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses1.courses.map((course, i) => (
                <CourseCard
                  isDeleting={deletingId === course._id}
                  cId={courses1._id}
                  key={i}
                  course={course}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={(course) => setSelectedCourse(course)}
                />
              ))}
            </div>
          </div>
        ))
      )}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default CourseList;
