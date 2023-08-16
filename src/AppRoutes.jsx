import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import Login from "./auth/components/Login";
import Register from "./auth/components/Register";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const {isEnabled} = useSelector(state => state.auth)
  return (
    <Routes>
      {isEnabled ? (
        <Route path="/*" element={<UserRoutes />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
