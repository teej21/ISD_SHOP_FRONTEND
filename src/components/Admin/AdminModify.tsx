import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavigation from "./AdminNavigation.tsx";
import schema from "../../validation/ModifyUserForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClickAdmin } from "../../context/AdminController.tsx";
import { AddUser } from "../../interface/IUSerInfo.ts";
import SystemErrorMessage from "../Login/login/SystemErrorMessage.tsx";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import useAccessToken from "../../composables/getAccessToken.ts";
import AdminHorizontal from "./AdminHorizontal.tsx";
import SuccessMessage from "../LoadingFrame/SuccessMessage.ts";
import failMessage from "../LoadingFrame/FailMessage.ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const AdminModify = () => {
  const [customerDetail, setCustomerDetail] = useState<AddUser>({
    id: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    phone_number: "",
    role: "",
    full_name: "",
    date_of_birth: "",
  });
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const { id } = useParams();
  const { accessToken, loading } = useAccessToken();
  const [isText, setIsText] = useState<boolean>(false);
  
  const handleText = () => {
    setIsText(prev => !prev);
  }
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        if (loading) return; 
        const response = await fetch(`http://localhost:8686/admin/users/${id}`, {
          method: 'GET',
          headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${accessToken}`}
        });
        const data = await response.json();
        if (response.ok) {
         let userData = {...data}
            userData.password =''
          setCustomerDetail(userData);
          console.log(userData);       
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerDetails()
  }, [accessToken, id]);

  const resetInfo = () => {
    setCustomerDetail({
      id: "",
      email: "",
      password: "",
      gender: "",
      address: "",
      phone_number: "",
      role: "",
      full_name: "",
      date_of_birth: "",
    });
  }

  const handleInfo = (e: any) => {
    const { name, value } = e.target;
    setCustomerDetail(value);
    console.log(customerDetail);
    setCustomerDetail((prevState) => ({
       ...prevState,
       [name]: value,
    }));
   };

  const submitCustomer = async (data: AddUser) => {
    data.password = customerDetail.password;
    try {
      if (loading) return; 
      const response = await fetch(`http://localhost:8686/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          "Authorization" : `Bearer ${accessToken}`
         },
        body: JSON.stringify(data),
      });

      if (response.ok) {
       SuccessMessage("Chỉnh sửa thành công!")
        handleNavigation();
        resetInfo();
      } else {
        failMessage((await response.json()).error);      
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: customerDetail, mode: 'onChange', values: customerDetail
  });

  const handleNavigation = () => {
    nav.handleSetMode("customer");
    navigate(-1);
  };
    const onFormError: SubmitErrorHandler<AddUser> = (errors, event) => {
      console.log("Form submission error:", errors);
    };

  return (
    <div>
      <AdminHorizontal />
      <div className="absolute top-[55%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Chỉnh sửa thông tin khách hàng
              </h1>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px]">
              <div>
                <Button
                  variant="contained"
                  className="bg-[#899BE0]"
                  onClick={handleNavigation}
                >
                  <div className="flex items-center gap-[10px]">
                    <KeyboardReturn></KeyboardReturn>
                    <span>Trở về</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4 px-8 py-4 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit(submitCustomer, onFormError)} className="w-full h-full">
          <div className="flex flex-row justify-between items-center h-full gap-[70px]">
            <div className="flex flex-col justify-between h-[80%] w-full">
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                Họ và tên:
                <input
                  type="text"
                  id="full_name"
                  className="w-full p-2 border-2 border-solid border-black"
                  {...register('full_name')}
                  value={customerDetail.full_name}
                  onChange={handleInfo}
                />
                 {errors.full_name && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.full_name.message}
                    </h1>
                  )}
              </label>
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                   Đổi Mật khẩu 
                   <div className="relative">
                  <input
                    type={isText ? 'text' : 'password'}
                    {...register("password")}
                    className="w-full p-2 border-2 border-solid border-black"
                    onChange={handleInfo}
                  />
                  {isText ? <VisibilityIcon onClick={handleText}  className="absolute right-3 top-[10%]"></VisibilityIcon> : <VisibilityOffIcon onClick={handleText}  className="absolute right-3 top-[10%]"></VisibilityOffIcon>}
                  </div>
                </label>
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                Số điện thoại:
                <input
                  type="text"
                  id="phone_number"
                  className="w-full p-2 border-2 border-solid border-black"
                  {...register('phone_number')}
                  value={customerDetail.phone_number}
                  onChange={handleInfo}
                />
              </label>
              {errors.phone_number && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.phone_number.message}
                    </h1>
                  )}
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                Địa chỉ:
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 border-2 border-solid border-black"
                  value={customerDetail.address}
                  {...register('address')}
                  onChange={handleInfo}
                />
                 {errors.address && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.address.message}
                    </h1>
                  )}
              </label>
            </div>
            <div className="flex flex-col justify-between h-[80%] w-full">
              <div className="flex flex-row justify-between items-center">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Chức vụ:
                  <select className="w-full p-2 border-2 border-solid border-black" {...register('role')}>
                    <option selected disabled value="CUSTOMER">
                      CUSTOMER
                    </option>
                  </select>
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Giới tính:
                  <select className="w-full p-2 border-2 border-solid border-black" {...register('gender')}>
                    <option selected disabled value="">
                      Giới tính
                    </option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                Email:
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border-2 border-solid border-black"
                  value={customerDetail.email}
                  {...register('email')}
                  onChange={handleInfo}
                />
                 {errors.email && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.email.message}
                    </h1>
                  )}
              </label>
              <label className="flex flex-col text-xl font-bold gap-[10px]">
                Ngày sinh:
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border-2 border-solid border-black"
                  value={customerDetail.date_of_birth}
                  {...register('date_of_birth')}
                  onChange={handleInfo}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-[40px]">
          <Button className="bg-emerald-600 text-white text-xl font-bold font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900 hover:font-bold" onClick={resetInfo}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 text-white text-xl font-bold font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900 hover:font-bold"
            >
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdminModify;
