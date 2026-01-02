import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGetContent, useUpdateOrDeleteContent } from "../../hooks/useHooks";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader";
import { MoonLoader } from "react-spinners";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { navItems } from "../../Component/Navbar/SidebarTabs";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const AdminAddSubUser = () => {
  document.title = "Add Subuser - Examon Dashboard";
  // const Navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [deletingId, setDeletingId] = useState(false);
  const [editingId, setEditingId] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editingId) {
      document.title = "Edit Subuser - Examon Dashboard";
      const userToEdit = data.data.find((u) => u._id === editingId);
      setNewUser({
        fullName: userToEdit.fullName,
        email: userToEdit.email,
        password: "",
      });
      setAllowedTabs(userToEdit.allowedTabs || []);
    } else {
      setNewUser({
        fullName: "",
        email: "",
        password: "",
      });
      setAllowedTabs([]);
    }
  }, [editingId]);

  let {
    data,
    isLoading,
    isError: isError2,
    error: error2,
  } = useGetContent({
    keys: ["user"],
    handlerProps: {
      url: `/admin/subuser/get`,
    },
  });

  const { mutate, isPending, isError, error } = useUpdateOrDeleteContent({
    keys: ["user"],
  });

  const handleTabToggle = (label) => {
    setAllowedTabs((prev) =>
      prev.includes(label)
        ? prev.filter((id) => id !== label)
        : [...prev, label]
    );
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnEdit = (id) => {
    setEditingId(id);
    const userToEdit = data.data.find((u) => u._id === id);
    setNewUser({
      fullName: userToEdit.fullName,
      email: userToEdit.email,
      password: userToEdit.password,
    });
    setAllowedTabs(userToEdit.allowedTabs || []);
  };

  const onDelete = (id) => {
    setDeletingId(id);
    mutate(
      {
        method: "delete",
        url: `/admin/subuser/delete/${id}`,
      },
      {
        onSuccess: (resp) => {
          setDeletingId(false);
          toast.success(resp?.response?.data?.message || "Subuser deleted");
        },
        onError: (e) => {
          setDeletingId(false);
          toast.error(e.message || "Error deleting subuser");
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.fullName || !newUser.email) {
      toast.error("All fields are required");
      return;
    }
    if (!editingId && !newUser.password) {
      toast.error("All fields are required");
      return;
    }
    if (allowedTabs.length === 0) {
      toast.error("Select at least one tab");
      return;
    }
    // setNewUser();
    // console.log(newUser);

    mutate(
      {
        method: editingId ? "patch" : "post",
        url: editingId
          ? `/admin/subuser/edit/${editingId}`
          : "/admin/subuser/signup",
        data: { ...newUser, role: "subUser", allowedTabs },
      },
      {
        onSuccess: (resp) => {
          // console.log(resp);
          if (editingId) {
            setNewUser({
              fullName: "",
              email: "",
              password: "",
            });
            setAllowedTabs([]);
          }
          if (!editingId) setShowOtp(true);
          toast.success(resp?.msg || resp?.message || "Subuser created");
          // Navigate(-1);
        },
        onError: (e) => {
          // console.log(e);
          toast.error(
            e.response.data.message ||
            e.response.data.msg ||
            e.message ||
            "Error creating subuser"
          );
        },
      }
    );
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    // console.log(otp);
    mutate(
      {
        method: "post",
        url: "/subuser/verify-otp",
        data: { email: newUser.email, otp },
      },
      {
        onSuccess: (resp) => {
          // console.log(resp);
          setNewUser({
            fullName: "",
            email: "",
            password: "",
          });
          setAllowedTabs([]);
          setShowOtp(false);
          toast.success(resp?.message || "Subuser verified");
        },
        onError: (e) => {
          // console.log(e);
          toast.error(
            e.response.data?.message ||
            e.response.data?.msg ||
            e.message ||
            "Error verifing subuser"
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Update" : "Create"} Subuser
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled={isPending || showOtp}
                required
                name="fullName"
                value={newUser.fullName}
                onChange={(e) => handleOnChange(e)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                disabled={isPending || showOtp}
                name="email"
                value={newUser.email}
                onChange={(e) => handleOnChange(e)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  disabled={isPending || showOtp}
                  value={newUser.password}
                  onChange={(e) => handleOnChange(e)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder={editingId ? "New Password" : "Password"}
                />

                {!showPassword ? (
                  <IoMdEyeOff
                    size={20}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    tabIndex={-1}
                  />
                ) : (
                  <IoEye
                    size={20}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    tabIndex={-1}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Allowed Tabs
              </label>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((tab, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 border rounded p-2  cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      disabled={isPending || showOtp}
                      checked={allowedTabs.includes(tab?.label)}
                      onChange={() => handleTabToggle(tab.label)}
                    />
                    <span className="text-sm">{tab.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {!showOtp && (
              <button
                type="submit"
                disabled={isPending}
                className="mt-2 px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60"
              >
                {isPending
                  ? "Submitting..."
                  : editingId
                    ? "Update Subuser"
                    : "Create Subuser"}
              </button>
            )}
            {isError && (
              <p className="text-red-600 font-medium mt-2"> {error.message}</p>
            )}
          </form>
          {showOtp && (
            <form className="w-2xl mt-2.5 flex gap-3" onSubmit={verifyOtp}>
              <input
                type="text"
                className="border rounded-md p-2"
                placeholder="Enter OTP"
                maxLength={6}
                required
                disabled={isPending}
                minLength={6}
                inputMode="numeric"
                pattern="\d*"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtp(value);
                }}
                name="otp"
                value={otp}
              />

              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {isPending ? "Verifing" : " Verify"}
              </button>
            </form>
          )}
        </div>
        <div className="md:col-span-2">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 ">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sub Users
                </h3>
                <span className="text-xs text-gray-500">
                  {data?.data.length} total
                </span>
              </div>

              {/* Scrollable list inside fixed panel */}
              <div className="max-h-[460px] overflow-y-auto px-4 py-3 space-y-3">
                {data?.data.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No subuser.
                  </p>
                ) : (
                  data?.data.map((n, index) =>
                  (
                    <div
                      key={index}
                      className={`border relative border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition
                            ${deletingId === n._id ? "animate-pulse" : ""}
                          `}
                    >
                      <p
                        title={n.fullName}
                        className="text-xs text-blue-500 font-medium mb-1"
                      >
                        {n.fullName}
                      </p>
                      <p
                        title={n.email}
                        className="text-sm font-semibold text-gray-800"
                      >
                        {n.email}
                      </p>


                      <div className="absolute top-3 right-3">
                        {deletingId === n._id ? (
                          <MoonLoader color="#003e68" size={20} />
                        ) : editingId === n._id ? (
                          <RxCross2
                            size={30}
                            className={`bg-gray-200 rounded-full p-1.5 cursor-pointer hover:bg-gray-600 hover:text-white transition${isPending || (showOtp && "cursor-not-allowed")
                              }`}
                            title="Edit"
                            onClick={() => {
                              if (!isPending && !showOtp) setEditingId(null);
                            }}
                          />
                        ) : (
                          <div className="flex gap-2">
                            <MdEdit
                              size={30}
                              className={`bg-gray-200 rounded-full p-1.5 cursor-pointer hover:bg-gray-600 hover:text-white transition${isPending || (showOtp && "cursor-not-allowed")
                                }`}
                              title="Edit"
                              onClick={() => {
                                if (!isPending && !showOtp) handleOnEdit(n._id);
                              }}
                            />
                            <MdDelete
                              size={30}
                              className={`bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition${isPending || (showOtp && "cursor-not-allowed")
                                }`}
                              title="Delete"
                              onClick={() => {
                                if (!isPending) onDelete?.(n._id);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAddSubUser;
