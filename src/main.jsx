import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import Login from "./auth/components/Login";
import Register from "./auth/components/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <AppRoutes />
        </BrowserRouter> */}
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
