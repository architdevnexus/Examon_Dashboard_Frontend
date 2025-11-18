import { Navigate } from "react-router-dom";

const LogOut = ({ logout }) => {
  localStorage.removeItem("token");
  localStorage.removeItem("authUser");
  logout(null);
  return <Navigate to="/login" replace />;
};

export default LogOut;
