import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, setAuthUser }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }

    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://backend.mastersaab.co.in/api/profile/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setAuthUser(data.user);
      } catch (error) {
        toast.error("Session expired, please login again");
        localStorage.removeItem("token");
        navigate("/logout", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    getProfile();
  }, [token, navigate, setAuthUser]);

  if (checking) return null; // or loader

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
