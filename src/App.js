import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import AuthLayout from './layouts/AuthLayout'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './context/CartContextProvider'
import { ToastContainer } from 'react-toastify';
import WishList from './components/WishList/WishList'
import WishlistContextProvider from './context/WishlistContextProvider'
import Forgot from './components/Forgot/Forgot'
import Resett from './components/Resett/Resett'


export default function App() {

  const routes = createHashRouter([
    {
      path: '/', element: <MainLayout />, children: [
        
        { path: 'Home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: 'product-details/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        {path:  'wish',element: <ProtectedRoutes><WishList/></ProtectedRoutes>},
        {path:  'Forgot',element: <ProtectedRoutes><Forgot/></ProtectedRoutes>},
        {path:  'reset',element: <ProtectedRoutes><Resett/></ProtectedRoutes>},
        { path: '*', element: <NotFound /> },
      ]
    },
    {
      path: '/', element: <AuthLayout />, children: [
        { index: true, element: <Signin /> },
        { path: 'signup', element: <Signup /> },
        { path: 'signin', element: <Signin /> },

      ]
    }
  ])

  return (
    <div>
     
      <WishlistContextProvider>
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </WishlistContextProvider>
    <ToastContainer theme="colored" autoClose={1000} />
      
   
  </div>
  )
}
