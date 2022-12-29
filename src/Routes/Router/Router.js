import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import PostDetails from "../../Pages/Posts/PostDetails";
import Posts from "../../Pages/Posts/Posts";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/posts', 
                element: <Posts></Posts>
            },
            {
                path: '/posts/:id', 
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
            {
                path: '/about', 
                element: <PrivateRoute><About></About></PrivateRoute>
            },
            {
                path: '/signup', 
                element: <SignUp></SignUp>
            },
        ]
    }
])

export default router; 