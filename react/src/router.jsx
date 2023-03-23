import {createBrowserRouter} from "react-router-dom";
import Login from "./view/login.jsx";
import Dashboard from "./view/dashboard.jsx";
import Register from "./view/register.jsx";
import GuestLayout from "./components/guestLayout";
import DefaultLayout from "./components/defaultLayout";
import Product from "./view/product";
import Category from "./view/category";
import User from "./view/user";
import ProductForm from  "./view/productForm.jsx"
import CategoryForm from  "./view/categoryForm.jsx"
import UserForm from "./view/userForm.jsx";
import ForgetPassword from "./view/forgetPassword";
import ResetPassword from "./view/resetPassword.jsx";
import Home from "./view/home.jsx";


const router = createBrowserRouter([
  {
    path:'/',
    element: <DefaultLayout/>,
    children:[
      {
        path:'/dashboard',
        element: <Home/>
      },
      {
        path:'/product',
        element: <Product/>
      },
      {
        path:'/product/create',
        element: <ProductForm/>
      },
      {
        path:'/product/:slug',
        element: <ProductForm/>
      },
      {
        path:'/category',
        element: <Category/>
      },
      {
        path:'/category/create',
        element: <CategoryForm/>
      },
      {
        path:'/category/:slug',
        element: <CategoryForm/>
      },
      {
        path:'/user',
        element: <User/>
      },
      {
        path:'/user/create',
        element: <UserForm/>
      },
      {
        path:'/user/:slug',
        element: <UserForm/>
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
      {
        path:'/forget-password',
        element: <ForgetPassword/>
      },
      {
        path:'/reset-password',
        element: <ResetPassword/>
      },
      {
        path:'/home',
        element: <Home/>
      },
    ]
  }




])
export default router;
