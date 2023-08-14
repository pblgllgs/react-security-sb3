import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import App from "../App";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Rutas;
