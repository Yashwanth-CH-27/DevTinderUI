import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./Login";
import Core from "./Core";
import Layout from "./Layout";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoutes";


const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (<ProtectedRoute>
            <Core/>
          </ProtectedRoute>),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
            path:"profile",
            element:<Profile/>
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default Body;
