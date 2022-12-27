import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Posts from "../../Pages/Posts/Posts";
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
                path: '/posts', 
                element: <Posts></Posts>
            },
            {
                path: '/about', 
                element: <About></About>
            },
            {
                path: '/signup', 
                element: <SignUp></SignUp>
            },
        ]
    }
])

export default router; 