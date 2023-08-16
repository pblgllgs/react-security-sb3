import {  Navigate, Route, Routes } from "react-router-dom";
import App from "../App";

export const UserRoutes = () => {
  return (
    <Routes>
      {sessionStorage.getItem("role") === "USER" && (
        <Route path="/dashboard" element={<App />} />
        )}
        <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
