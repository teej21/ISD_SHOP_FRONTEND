import React from 'react'
import Login from '../components/Login/login/Login.tsx'
import Signup from '../components/Login/login/Signup.tsx'
import ForgetPassword from '../components/Login/login/ForgetPassword.tsx'
import Homepage from '../components/Homepage/Homepage.tsx'
import {Routes, Route} from 'react-router-dom'
const Page = () => {
  return (
    <div>
    <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/sign_up' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword></ForgetPassword>}></Route>
        <Route path='/' element={<Homepage></Homepage>}></Route>
    </Routes>    
    </div>
  )
}

export default Page
