import React from 'react'
import Login from '../components/Login/login/Login.tsx'
import Signup from '../components/Login/login/Signup.tsx'
import ForgetPassword from '../components/Login/login/ForgetPassword.tsx'
import Homepage from '../components/Homepage/Homepage.tsx'
import Product_detail from '../components/Product_detail/Product_detail.tsx'
import Error_page from '../components/ErrorPage/Error_page.tsx'
import { Routes, Route } from 'react-router-dom'
import Admin from '../components/Admin/Admin.tsx'
import AdminPageDetail from '../components/Admin/AdminPageDetail.tsx'
import AdminAddUser from '../components/Admin/AdminAddUser.tsx'
import AdminAddEmployee from '../components/Admin/AdminAddEmployee.tsx'
import AdminModify from '../components/Admin/AdminModify.tsx'
import AdminCategoryDetail from '../components/Admin/Categories/AdminCategoryDetail.tsx'
import AdminCategoryAdd from '../components/Admin/Categories/AdminCategoriesAdd.tsx'
import AdminCategoriesModify from '../components/Admin/Categories/AdminCategoriesModify.tsx'
import AdminModifyEmployee from '../components/Admin/AdminModifyEmployee.tsx'
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
        <Route path="/admin/users/:id" element={<AdminPageDetail></AdminPageDetail>} />
        <Route path='/admin/users/add_customers' element={<AdminAddUser></AdminAddUser>}/>
        <Route path='/admin/users/add_employees' element={<AdminAddEmployee></AdminAddEmployee>}/>
        <Route path='/admin/users/:id/modify_customer' element={<AdminModify></AdminModify>}/>
        <Route path='/admin/users/:id/modify_employee' element={<AdminModifyEmployee></AdminModifyEmployee>}/>
        <Route path='/admin/categories/:id' element={<AdminCategoryDetail></AdminCategoryDetail>}/>
        <Route path='/admin/categories/add_category' element={<AdminCategoryAdd></AdminCategoryAdd>}/>
        <Route path='/admin/categories/:id/modify_category' element={<AdminCategoriesModify/>}></Route>
        <Route path='*' element={<Error_page/>}></Route>
    </Routes>    
    </div>
  )
}

export default Page
