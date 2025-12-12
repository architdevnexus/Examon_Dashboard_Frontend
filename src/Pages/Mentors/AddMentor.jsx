import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateOrDeleteContent } from "../../hooks/useHooks";
import MultipleValues from "../../Component/Input/MultipleValues";
import InputField from "../../Component/Input/InputField.jsx"; // <- reusable component

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
    CourseInput: "",
  });

  const [preview, setPreview] = useState(null);
  const imgRef = useRef(null);

  const { mutate, isPending, error } = useUpdateOrDeleteContent({
    keys: ["mentors"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setMentor((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setMentor((prev) => ({ ...prev, image: null }));
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    // append fields — handle files and arrays safely
    for (const key in mentor) {
      if (!Object.prototype.hasOwnProperty.call(mentor, key)) continue;
      const val = mentor[key];

      if (key === "image") {
        if (val) formData1.append("image", val); // file object
        continue;
      }

      if (Array.isArray(val)) {
        // backend may expect CSV or JSON; JSON is safer
        formData1.append(key, JSON.stringify(val));
        continue;
      }

      // append primitive values (coerce null/undefined -> empty string)
      formData1.append(key, val ?? "");
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
            CourseInput: "",
          });
          setPreview(null);
          if (imgRef.current) imgRef.current.value = null;

          toast.success("Mentor added");
          navigate("/mentors");
        },
        onError: (e) => {
          toast.error("error");
        },
      }
    );
  };

  const multiValueProps = {
    label: "Courses Handled",
    name: "CourseInput",
    placeholder: "add Course",
    formData: mentor,
    valueArray: mentor.CoursesHandled,
    valueArrayString: "CoursesHandled",
    setFormData: setMentor,
    onchange: handleChange,
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold   mb-6 text-center">
        Add New Mentor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image upload */}
        <div>
          <InputField
            label="Upload Image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={imgRef}
            inputClassName="w-full"
            helpText="Profile image for mentor"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Name */}
        <InputField
          label="Name"
          name="name"
          type="text"
          value={mentor.name}
          onChange={handleChange}
          required
          placeholder="Enter mentor name"
        />

        {/* Subject */}
        <InputField
          label="Subject"
          name="subjectTaught"
          type="text"
          value={mentor.subjectTaught}
          onChange={handleChange}
          placeholder="e.g., Hindi, English"
        />

        {/* Experience */}
        <InputField
          label="Experience"
          name="experience"
          type="text"
          value={mentor.experience}
          onChange={handleChange}
          placeholder="e.g., 4"
        />

        {/* Specialization */}
        <InputField
          label="Specialization"
          name="specialization"
          type="text"
          value={mentor.specialization}
          onChange={handleChange}
          placeholder="e.g., Mathematics"
        />

        <MultipleValues {...multiValueProps} />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          type="textarea"
          value={mentor.description}
          onChange={handleChange}
          maxLength={200}
          placeholder="Short bio or role description"
          inputClassName="h-20 resize-none"
        />

        {/* Youtube Channel */}
        <InputField
          label="Youtube Channel"
          name="youtubeLink"
          type="url"
          value={mentor.youtubeLink}
          onChange={handleChange}
          placeholder="https://www.youtube.com/@channelname"
        />

        {/* Courses Link */}
        <InputField
          label="Courses Link"
          name="coursesLink"
          type="url"
          value={mentor.coursesLink}
          onChange={handleChange}
          placeholder="https://your-website.com/instructor/mentor-name"
        />

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
