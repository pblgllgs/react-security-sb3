import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./context/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { publicRoutes } from "./routes/PublicRoutes";

const router = createBrowserRouter([
  ...publicRoutes(),
  {
    path: "dashboard",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
