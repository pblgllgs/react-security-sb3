import App from "../App";
import Login from "../auth/components/Login";
import Register from "../auth/components/Register";


export const publicRoutes = () => {
  return (
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <App />,
      },
    ]
  )
};
