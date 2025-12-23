import { useEffect, useState } from "react";

import { MdEdit, MdSave } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Loader from "../Component/Loader";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { StatInput } from "../Component/Input/AchimentInput";
import { useGetContent, useUpdateOrDeleteContent } from "../hooks/useHooks";
import InputField from "../Component/Input/InputField";

const Banners = () => {
  const [formData, setFormData] = useState({
    id: null,
    // aboutBanner: "",
    // courseBanner: "",
    // blogBanner: "",
    // contactBanner: "",
  });

  const [Editable, setEditable] = useState(false);
  const [preview, setPreview] = useState({
    aboutBanner: "",
    courseBanner: "",
    blogBanner: "",
    contactBanner: "",
  });

  const { data, isLoading, isSuccess, isError } = useGetContent({
    keys: ["banners"],
    handlerProps: {
      url: "/banners/all",
    },
  });

  const { mutate, isPending } = useUpdateOrDeleteContent({
    keys: ["banners"],
  });

  useEffect(() => {
    if (isSuccess && data.success) {
      const banners = data.banners[0];
      setFormData({
        id: banners._id,
        // aboutBanner: banners.aboutBanner[0].url,
        // courseBanner: banners.courseBanner[0].url,
        // blogBanner: banners.blogBanner[0].url,
        // contactBanner: banners.contactBanner[0].url,
      });
      setPreview({
        aboutBanner: banners.aboutBanner[0].url,
        courseBanner: banners.courseBanner[0].url,
        blogBanner: banners.blogBanner[0].url,
        contactBanner: banners.contactBanner[0].url,
      });
    }
  }, [isSuccess, data]);

  if (isLoading) return <Loader />;

  if (isError) {
    return;
  }

  //   Handle input changes

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, [e.target.name]: file }));
    setPreview((prev) => ({
      ...prev,
      [e.target.name]: URL.createObjectURL(file),
    }));
  };
  //  Submit form data to backend
  const handleSubmit = () => {
    // console.log(formData);
    const FD = new FormData();

    for (const key in formData) {
      FD.append(key, formData[key]);
    }

    mutate(
      {
        url: `/banners/update/${formData.id}`,
        data: FD,
        method: "patch",
      },
      {
        onSuccess: (resp) => {
          // console.log(resp);
          toast.success(resp.message || "Banner updated");
          setEditable(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  const fields = [
    { label: "About Page Banner", name: "aboutBanner" },
    { label: "Course Page Banner", name: "courseBanner" },
    { label: "Blog Page Banner", name: "blogBanner" },
    { label: "Contact Page Banner", name: "contactBanner" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white  relative shadow-lg rounded-xl p-8 w-full max-w-5xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Current Banners
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
          {fields.map((f, i) => (
            <div key={i}>
              <InputField
                name={f.name}
                label={f.label}
                disabled={!Editable || isPending}
                type="file"
                onChange={handleFileChange}
              />
              {preview[f.name] && (
                <img
                  src={preview[f.name]}
                  alt="Preview"
                  className="object-cover mt-3"
                />
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Banners;
