import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";
import MultipleValues from "../../Component/Input/MultipleValues";
import InputField from "../../Component/Input/InputField.jsx";

export default function AddMentorForm() {
  const navigate = useNavigate();
  const imgRef = useRef(null);

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
    CourseInput: "",
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
    const file = e.target.files?.[0];
    if (file.type.startsWith("image/")) {
      setMentor((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }
    e.target.value = null;
    toast.error("Please select a valid image file.");
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (mentor.image) formData.append("image", mentor.image);

    formData.append("name", mentor.name);
    formData.append("subjectTaught", mentor.subjectTaught);
    formData.append("experience", mentor.experience);
    formData.append("specialization", mentor.specialization);
    formData.append("description", mentor.description);
    formData.append("youtubeLink", mentor.youtubeLink);
    formData.append("coursesLink", mentor.coursesLink);

    // ✅ REAL ARRAY: append each course individually
    mentor.CoursesHandled.forEach((course) => {
      formData.append("CoursesHandled", course); // backend receives array
    });

    mutate(
      { method: "post", url: "/mentors/create", data: formData },
      {
        onSuccess: () => {
          toast.success("Mentor added");
          navigate("/mentors");

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
            CourseInput: "",
          });

          if (imgRef.current) imgRef.current.value = null;
          setPreview(null);
        },
        onError: () => toast.error("Something went wrong"),
      }
    );
  };

  const multiValueProps = {
    label: "Courses Handled",
    name: "CourseInput",
    placeholder: "Add course",
    formData: mentor,
    valueArray: mentor.CoursesHandled,
    valueArrayString: "CoursesHandled",
    setFormData: setMentor,
    onchange: handleChange,
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add New Mentor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          disabled={isPending}
          label="Upload Image"
          type="file"
          required
          accept="image/*"
          onChange={handleFileChange}
          ref={imgRef}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg mt-3"
          />
        )}

        <InputField
          disabled={isPending}
          label="Name"
          name="name"
          value={mentor.name}
          onChange={handleChange}
          required
        />
        <InputField
          disabled={isPending}
          label="Subject"
          required
          name="subjectTaught"
          value={mentor.subjectTaught}
          onChange={handleChange}
        />
        <InputField
          disabled={isPending}
          label="Experience"
          name="experience"
          value={mentor.experience}
          onChange={handleChange}
        />
        <InputField
          disabled={isPending}
          label="Specialization"
          name="specialization"
          value={mentor.specialization}
          onChange={handleChange}
        />

        <MultipleValues {...multiValueProps} />

        <InputField
          disabled={isPending}
          label="Description"
          required
          rows={4}
          type="textarea"
          name="description"
          value={mentor.description}
          onChange={handleChange}
        />

        <InputField
          disabled={isPending}
          label="Youtube Link"
          name="youtubeLink"
          value={mentor.youtubeLink}
          onChange={handleChange}
        />
        <InputField
          disabled={isPending}
          label="Courses Link"
          name="coursesLink"
          value={mentor.coursesLink}
          onChange={handleChange}
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          {isPending ? "Adding..." : "Add Mentor"}
        </button>
      </form>
    </div>
  );
}
