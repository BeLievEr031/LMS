import { createBrowserRouter } from "react-router-dom";
// import Home from "../pages/Home";
import RootLayout from "../Layouts/RootLayout";
import Auth from "../pages/Auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "auth",
                element: <Auth />
            }
        ]
    }
])

// Clerk 


export default router;
