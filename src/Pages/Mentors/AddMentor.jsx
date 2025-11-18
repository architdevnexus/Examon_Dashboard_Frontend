import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";

export default function AddMentorForm() {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState({
    image: null,
    name: "",
    subjectTaught: "",
    experience: "",
    specialization: "",
    description: "",
    youtubeLink: "",
    coursesLink: "",
    CoursesHandled: [],
  });

  const [preview, setPreview] = useState(null);

  const { mutate, isPending, error } = useUpdateOrDeleteContent({
    keys: ["mentors"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMentor((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const addCourse = () => {
    const course2add = prompt("Enter Tag value (1-20 characters)");
    const trimmedCourse = course2add.trim();
    if (trimmedCourse && trimmedCourse.length < 21) {
      setMentor((prev) => ({
        ...prev,
        CoursesHandled: [...prev.CoursesHandled, trimmedCourse],
      }));
    } else {
      alert("Tag can have max 20 characters");
    }
  };

  const removeCourse = (course2remove) => {
    const remainingCourses = mentor.CoursesHandled.filter(
      (course) => course != course2remove
    );

    setMentor((prev) => ({ ...prev, CoursesHandled: remainingCourses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(mentor);
    const formData1 = new FormData();

    for (const key in mentor) {
      formData1.append(key, mentor[key]);
    }

    mutate(
      {
        method: "post",
        data: formData1,
        url: "/mentors/create",
      },
      {
        onSuccess: (resp) => {
          setMentor({
            image: null,
            name: "",
            subjectTaught: "",
            experience: "",
            specialization: "",
            description: "",
            youtubeLink: "",
            coursesLink: "",
            CoursesHandled: [],
          });
          setPreview(null);
          console.log(resp);
          toast.success("Mentor added");
          navigate("/mentors");
        },
        onError: (e) => {
          console.log(e);
          toast.error("error");
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
        Add New Mentor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            // name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:cursor-pointer  text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            // required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg  "
            />
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={mentor.name}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
            placeholder="Enter mentor name"
          />
        </div>

        {/* subject */}
        <div>
          <label className="block text-gray-700 font-medium">Subject</label>
          <input
            type="text"
            name="subjectTaught"
            value={mentor.subjectTaught}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 "
            placeholder="e.g., Hindi, English"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-gray-700 font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            value={mentor.experience}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 "
            placeholder="e.g., 4"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-gray-700 font-medium">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={mentor.specialization}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 "
            placeholder="e.g., Mathematics"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Courses Handled</h3>
          {mentor.CoursesHandled.map((course, index) => (
            <div
              key={index}
              className="pr-2 pl-3 inline py-2 m-1 rounded-md bg-blue-600 text-white"
            >
              {course}
              <span
                onClick={() => {
                  !isPending && removeCourse(course);
                }}
                className="text-lg ml-1 p-1 text-gray-100 cursor-pointer"
              >
                ×
              </span>
            </div>
          ))}
          <button
            type="button"
            disabled={isPending}
            style={{
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onClick={addCourse}
            className="px-3 py-2 cursor-pointer bg-green-600 text-white text-sm rounded-lg"
          >
            + Add course
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            maxLength={200}
            value={mentor.description}
            onChange={handleChange}
            className="w-full mt-1 resize-none border border-gray-300 rounded-md px-4 py-2 "
            placeholder="Short bio or role description"
            rows="3"
          ></textarea>
        </div>

        {/* youtube channel link */}
        <div>
          <label className="block text-gray-700 font-medium">
            Youtube Channel
          </label>
          <input
            type="url"
            name="youtubeLink"
            value={mentor.youtubeLink}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 "
            placeholder="https://www.youtube.com/@chnanelname"
          />
        </div>

        {/* Courses Link */}
        <div>
          <label className="block text-gray-700 font-medium">
            Courses Link
          </label>
          <input
            type="url"
            name="coursesLink"
            value={mentor.coursesLink}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 "
            placeholder="https://your-website.com/instructor/mentor-name"
          />
        </div>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition ${
            isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Adding..." : "Add Mentor"}
        </button>
      </form>
    </div>
  );
}
