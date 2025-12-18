import { useEffect, useState } from "react";

import { MdEdit, MdSave } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Loader from "../Component/Loader";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { StatInput } from "../Component/Input/AchimentInput";
import { useGetContent, useUpdateOrDeleteContent } from "../hooks/useHooks";
import InputField from "../Component/Input/InputField";

const Achievements = () => {
  const [formData, setFormData] = useState({
    id: null,
    activeUser: "",
    courses: "",
    passingRate: "",
    satisfyUser: "",
    Instructors: "",
    alumni: "",
  });

  const [Editable, setEditable] = useState(false);

  const { data, isLoading, isSuccess, isError } = useGetContent({
    keys: ["achievement"],
    handlerProps: {
      url: "/achievement/get",
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["achievement"],
  });

  useEffect(() => {
    if (isSuccess && data.success) {
      const stats = data.data[0];
      setFormData({
        id: stats._id,
        activeUser: stats.activeUser,
        courses: stats.courses,
        passingRate: stats.passingRate,
        satisfyUser: stats.satisfyUser,
        Instructors: stats.Instructors,
        alumni: stats.alumni,
      });
    }
  }, [isSuccess, data]);

  if (isLoading) return <Loader />;

  if (isError) {
    return;
  }

  //   Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Submit form data to backend
  const handleSubmit = () => {
    mutate(
      {
        url: `/achievement/update/${formData.id}`,
        data: formData,
        method: "patch",
      },
      {
        onSuccess: (resp) => {
          toast.success("Stats updated");
          setEditable(false);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  const fields = [
    { label: "Active Users (in Million)", name: "activeUser" },
    { label: "Students Satisfaction (%)", name: "satisfyUser" },
    { label: "Courses", name: "courses" },
    { label: "Our selection", name: "passingRate" },
    { label: "No. of Alumni", name: "alumni" },
    { label: "No. of Instructors", name: "Instructors" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white  relative shadow-lg rounded-xl p-8 w-full max-w-4xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Current Stats
        </h2>
        <div className="flex gap-2 absolute top-3 right-3 ">
          {!Editable ? (
            <MdEdit
              onClick={() => {
                setEditable(true);
              }}
              className="cursor-pointer p-2 rounded-full  bg-gray-300 hover:text-red-700"
              size={37}
            />
          ) : isPending ? (
            <MoonLoader color="#003e68" size={20} />
          ) : (
            <div className="flex  gap-2">
              <RxCross2
                onClick={() => {
                  setEditable(false);
                }}
                className="cursor-pointer p-2 rounded-full  bg-gray-300 hover:text-red-700"
                size={37}
              />
              <div
                onClick={handleSubmit}
                className="cursor-pointer p-2 hover:font-semibold rounded-full flex gap-1 items-center justify-center bg-gray-300 hover:text-green-700"
              >
                <MdSave size={20} />
                <button className="cursor-pointer">Save</button>
              </div>
            </div>
          )}
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          {fields.map((f) => (
            <InputField
              key={f.name}
              name={f.name}
              label={f.label}
              disabled={!Editable}
              type="number"
              min={0}
              value={formData[f.name]}
              onChange={handleChange}
              placeholder="e.g. PYQ"
              required
            />
          ))}
        </form>
      </div>
    </div>
  );
};

export default Achievements;
