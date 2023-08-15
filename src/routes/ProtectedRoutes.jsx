import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { isEnabled } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEnabled) {
      navigate("/");
    }
  });

  return isEnabled ? children : "";
};

export default ProtectedRoutes;
