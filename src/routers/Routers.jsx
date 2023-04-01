import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import ProductDetails from '../pages/ProductDetails'
import Signup from '../pages/Signup'
import ProtectedRouter from './ProtectedRouter'
import AddProduct from '../admin/AddProduct'
import AllProduct from '../admin/AllProduct'
import Dashboard from '../admin/Dashboard'
import User from '../admin/User'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop/:id" element={<ProductDetails />} />

        <Route path='/*' element={<ProtectedRouter />}>

          <Route path='checkout' element={<Checkout />} />
          <Route path='dashboard/all-products' element={<AllProduct />} />
          <Route path='dashboard/add-product' element={<AddProduct />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='dashboard/users' element={<User />} />

        </Route>

        {/* <Route 
        path="/checkout" 
        element={<ProtectedRouter>
          <Checkout />
        </ProtectedRouter>} /> */}
      </Routes>
    </div>
  )
}

export default Routers
