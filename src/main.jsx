import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { publicRoutes } from "./routes/PublicRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
    <Provider store={store}>
      <ChakraProvider>
          <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
