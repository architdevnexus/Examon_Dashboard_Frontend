import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/Loader";
import { toast } from "react-toastify";
import {
  useGetContentById,
  useUpdateOrDeleteContent,
} from "../../hooks/useHooks";
import MultipleValues from "../../Component/Input/MultipleValues";

export default function UpdateMentorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [mentorData, setMentorData] = useState({
    name: "",
    subjectTaught: "",
    experience: "",
    specialization: "",
    description: "",
    image: "",
    youtubeLink: "",
    coursesLink: "",
    CoursesHandled: [], // updated field name
    CourseInput: "",
  });

  const {
    data: mentor,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContentById({
    id,
    keys: ["mentor", id],
    handlerProps: {
      url: `/mentors/${id}`,
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["mentor"],
  });

  useEffect(() => {
    if (isSuccess && mentor?.data) {
      const data = mentor.data;

      setMentorData({
        name: data.name,
        subjectTaught: data.subjectTaught,
        experience: data.experience,
        specialization: data.specialization,
        description: data.description,
        image: data.imageUrl, // same
        youtubeLink: data.youtubeLink,
        coursesLink: data.coursesLink,
        CoursesHandled: data?.CoursesHandled[0]?.split(",") || [],
      });

      setPreview(data?.imageUrl || null);
      //console.log(data);
    }
  }, [isSuccess, mentor]);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMentorData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in mentorData) {
      formData.append(key, mentorData[key]);
    }
    // console.log(mentorData);
    mutate(
      {
        method: "patch",
        url: `/mentors/update/${id}`,
        data: formData,
      },
      {
        onSuccess: (resp) => {
          //console.log(resp);
          toast.success("Mentor Updated Successfully");
          setMentorData({
            name: "",
            subjectTaught: "",
            experience: "",
            specialization: "",
            description: "",
            image: "",
            youtubeLink: "",
            coursesLink: "",
            CoursesHandled: [],
          });
          navigate("/mentors");
        },
        onError: (err) => {
          //console.log(err);
          toast.error(err?.response?.data?.message || "Update failed");
        },
      }
    );
  };

  const multiValueProps = {
    label: "Courses Handled",
    name: "CourseInput",
    placeholder: "add Course",
    formData: mentorData,
    valueArray: mentorData.CoursesHandled,
    valueArrayString: "CoursesHandled",
    setFormData: setMentorData,
    onchange: handleChange,
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
        Update Mentor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            disabled={isPending}
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:border-0 file:rounded cursor-pointer"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            disabled={isPending}
            value={mentorData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Subject Taught
          </label>
          <input
            type="text"
            disabled={isPending}
            name="subjectTaught"
            value={mentorData.subjectTaught}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            value={mentorData.experience}
            disabled={isPending}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={mentorData.specialization}
            disabled={isPending}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>

        <MultipleValues {...multiValueProps} />

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={mentorData.description}
            disabled={isPending}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            YouTube Link
          </label>
          <input
            type="url"
            name="youtubeLink"
            value={mentorData.youtubeLink}
            disabled={isPending}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Courses Link
          </label>
          <input
            type="url"
            name="coursesLink"
            value={mentorData.coursesLink}
            disabled={isPending}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-indigo-600 text-white py-2 rounded-md font-medium transition ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
