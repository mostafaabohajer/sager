import {createBrowserRouter} from "react-router-dom";
import Login from "./view/login.jsx";
import Dashboard from "./view/dashboard.jsx";
import Register from "./view/register.jsx";
import GuestLayout from "./components/guestLayout";
import DefaultLayout from "./components/defaultLayout";
import Product from "./view/product";
import Category from "./view/category";
import User from "./view/user";
const router = createBrowserRouter([
  {
    path:'/',
    element: <DefaultLayout/>,
    children:[
      {
        path:'/dashboard',
        element: <Dashboard/>
      },
      {
        path:'/product',
        element: <Product/>
      },
      {
        path:'/category',
        element: <Category/>
      },
      {
        path:'/user',
        element: <User/>
      },
    ]
  },
  {
    path:'/',
    element:<GuestLayout/>,
    children:[
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/register',
        element: <Register/>
      },
    ]
  }




])
export default router;
