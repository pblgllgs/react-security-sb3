import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const {isEnabled} = useSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEnabled) {
      navigate("/");
    }
  });

  return isEnabled ? children : "";
};

export default ProtectedRoutes;
