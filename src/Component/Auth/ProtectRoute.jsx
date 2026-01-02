import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, setAuthUser, user }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }



  const getProfile = async () => {
    try {
      const { data } = await axios.get('https://backend.mastersaab.co.in/api/profile/get', {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem("token"))}`
        },
        withCredentials: true,
      });
      setAuthUser(data.user);

    } catch (error) {
      toast.error("Session expired, please login again");
      return <Navigate to="/logout" replace />;
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  // console.log(user)
  // console.log(location.pathname)

  // if (user?.allowedTabs?.includes("Dashboard")) {
  //   toast.error("You don't have access to this page");
  //   return <Navigate to="/dashboard" replace />;
  // }

  return children;
}
