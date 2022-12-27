import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Main></Main>,
        children: [
            {
                path: '/', 
                element: <Login></Login>
            },
            {
                path: '/home', 
                element: <Home></Home>
            },
            {
                path: '/signup', 
                element: <SignUp></SignUp>
            },
        ]
    }
])

export default router; 