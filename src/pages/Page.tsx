import React from 'react'
import Login from '../components/Login/login/Login.tsx'
import Signup from '../components/Login/login/Signup.tsx'
import ForgetPassword from '../components/Login/login/ForgetPassword.tsx'
import Homepage from '../components/Homepage/Homepage.tsx'
import Product_detail from '../components/Product_detail/Product_detail.tsx'
import Error_page from '../components/ErrorPage/Error_page.tsx'
import { Routes, Route } from 'react-router-dom'
import Admin from '../components/Admin/Admin.tsx'
const Page = () => {
  return (
    <div>
    <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/sign_up' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword></ForgetPassword>}></Route>
        <Route path='/' element={<Homepage></Homepage>}>
        </Route>
        <Route path='/id' element={<Product_detail></Product_detail>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='*' element={<Error_page/>}></Route>
    </Routes>    
    </div>
  )
}

export default Page
