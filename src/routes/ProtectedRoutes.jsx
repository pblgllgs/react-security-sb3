import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { authenticatedStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedStatus) {
      navigate("/");
    }
  });

  return authenticatedStatus ? children : "";
};

export default ProtectedRoutes;
