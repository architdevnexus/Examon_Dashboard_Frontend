import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = localStorage.getItem("authUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
