import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import schema from "../../validation/AddUserForm.ts";
import { AddUser } from "../../interface/IUSerInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../context/AdminController.tsx";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import useAccessToken from "../../composables/getAccessToken.ts";
import AdminHorizontal from "./AdminHorizontal.tsx";
import SuccessMessage from "../LoadingFrame/SuccessMessage.ts";
import failMessage from "../LoadingFrame/FailMessage.ts";
import getConfigObject from "../../env/env.ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const AdminAddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUser>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const { accessToken, loading } = useAccessToken();
  const [isText, setIsText] = useState<boolean>(false);
  const handleText = () => {
    setIsText(prev => !prev);
  }
  const submitCustomer = async (data: AddUser) => {
    console.log(data);  
    if (loading) return; 
    try {
      const response = await fetch("http://localhost:8686/admin/users",{
        method: 'POST',
        headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${accessToken}`},
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseBody = await response.json();
        SuccessMessage(responseBody.result);
        handleNavigation();
        reset();
      } else {
        failMessage((await response.json()).error);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const onFormError: SubmitErrorHandler<AddUser> = (errors, event) => {
    console.log("Form submission error:", errors);
  };

  const handleNavigation = () => {
    nav.handleSetMode("customer");
    navigate(-1);
  };

  const resetInfo = () => {reset()};
  return (
    <div>
      <AdminHorizontal/>
      <div className="absolute top-[55%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">Thêm thông tin khách hàng</h1>
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
          <form
            onSubmit={handleSubmit(submitCustomer, onFormError)}
            className="w-full h-full"
          >
            <div className="flex flex-row justify-between items-center h-full gap-[70px]">
              <div className="flex flex-col justify-between h-[80%] w-full">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Họ và tên:
                  <input
                    type="text"
                    {...register("full_name")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.full_name && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.full_name.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Số điện thoại:
                  <input
                    type="text"
                    {...register("phone_number")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.phone_number && (
                    <h1 className="text-red-500 font-bold text-xl">
                     {errors.phone_number.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Địa chỉ:
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.address && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.address.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                   Mật khẩu
                   <div className="relative">
                  <input
                    type={isText ? 'text' : 'password'}
                    {...register("password")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.password && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.password.message}
                    </h1>
                  )}
                  {isText ? <VisibilityIcon onClick={handleText}  className="absolute right-3 top-[10%]"></VisibilityIcon> : <VisibilityOffIcon onClick={handleText}  className="absolute right-3 top-[10%]"></VisibilityOffIcon>}
                  </div>
                </label>
              </div>
              <div className="flex flex-col justify-between h-[80%] w-full">
                <div className="flex flex-row justify-between items-center">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chức vụ:
                    <select
                      {...register("role", { required: true })}
                      className="w-full p-2 border-2 border-solid border-black"
                    >
                      <option selected disabled value="CUSTOMER">
                        CUSTOMER
                      </option>
                    </select>
                    {errors.role && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.role.message}
                      </h1>
                    )}
                  </label>
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Giới tính:
                    <select
                      {...register("gender", { required: true })}
                      className="w-full p-2 border-2 border-solid border-black"
                    >
                      <option selected disabled value="">
                        Giới tính
                      </option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                    {errors.gender && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.gender.message}
                      </h1>
                    )}
                  </label>
                </div>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Email:
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2 border-2 border-solid border-black"
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
                    {...register("date_of_birth")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.date_of_birth && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.date_of_birth.message}
                    </h1>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-[40px]">
            <Button
                className="bg-emerald-600 text-white text-xl font-bold font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900 hover:font-bold"
                onClick={resetInfo}
              >
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

export default AdminAddUser;
