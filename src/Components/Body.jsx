import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Core from "./Core";
import Layout from "./Layout";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element:<Layout/>,
            children: [
                {
                    index: true,
                    element: <Core/>,
                },
                {
                    path:"login",
                    element:<Login/>
                },
            ]
        },
    ])
    return(
        <RouterProvider router={appRouter}/>
    )
}

export default Body;