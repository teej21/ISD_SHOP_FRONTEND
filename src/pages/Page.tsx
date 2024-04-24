import React, { useEffect, useState } from 'react'
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
import AdminProductAdd from '../components/Admin/Product/AdminProductAdd.tsx'
import AdminProductModify from '../components/Admin/Product/AdminProductModify.tsx'
import AdminProductDetail from '../components/Admin/Product/AdminProductDetail.tsx'
import AdminEmployeeDetail from '../components/Admin/AdminEmployeeDetail.tsx'
const Page = () => {
  const [role, setRole] = useState<string | null>('');
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, [])
  
  return (
    <div>
    <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/sign_up' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword></ForgetPassword>}></Route>
        <Route path='/' element={<Homepage></Homepage>}>
        </Route>
        <Route path='/id' element={<Product_detail></Product_detail>}></Route>
        {role !== 'CUSTOMER' && <Route path='/admin' element={<Admin></Admin>}></Route>}
        {role !== 'CUSTOMER' && <Route path="/admin/users/customer/:id" element={<AdminPageDetail></AdminPageDetail>} />}
        {role !== 'CUSTOMER' && <Route path="/admin/users/employee/:id" element={<AdminEmployeeDetail></AdminEmployeeDetail>} />}
        {role !== 'CUSTOMER' && <Route path='/admin/users/add_customers' element={<AdminAddUser></AdminAddUser>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/users/add_employees' element={<AdminAddEmployee></AdminAddEmployee>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/users/:id/modify_customer' element={<AdminModify></AdminModify>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/users/:id/modify_employee' element={<AdminModifyEmployee></AdminModifyEmployee>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/categories/:id' element={<AdminCategoryDetail></AdminCategoryDetail>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/categories/add_category' element={<AdminCategoryAdd></AdminCategoryAdd>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/categories/:id/modify_category' element={<AdminCategoriesModify/>}></Route>}
        {role !== 'CUSTOMER' && <Route path='/admin/products/:id' element={<AdminProductDetail/>}></Route>}
        {role !== 'CUSTOMER' && <Route path='/admin/products/add_product' element={<AdminProductAdd></AdminProductAdd>}/>}
        {role !== 'CUSTOMER' && <Route path='/admin/products/:id/modify_product' element={<AdminProductModify/>}></Route>}
        <Route path='*' element={<Error_page/>}></Route>
    </Routes>    
    </div>
  )
}

export default Page
