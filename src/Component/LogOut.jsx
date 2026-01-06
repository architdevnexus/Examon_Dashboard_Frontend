import { Navigate } from "react-router-dom";
import { CheckOut } from "../Handler/Authentication";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LogOut = ({ logout, user }) => {
  localStorage.removeItem("token");
  logout(null);

// testing for ci/cd 1.1.3
  // const LogOut = async (e) => {

  //   try {
  //     const data = await CheckOut(user?.role === "admin" ? "" : "/subuser");
  //     localStorage.removeItem("token");
  //     console.log(data)
  //     logout(null);

  //   } catch (err) {
  //     toast.error(
  //       err?.response?.data?.msg || err?.message || "Something went wrong Try again"
  //     );
  //   }
  // };

  // useEffect(() => {
  //   LogOut()
  // }, [])

  return <Navigate to="/login" replace />;
};

export default LogOut;
