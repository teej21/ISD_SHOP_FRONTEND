import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavigation from "../AdminNavigation.tsx";
import schema from "../../../validation/AddCategoryForm.ts";
import { AddUser } from "../../../interface/IUSerInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SystemErrorMessage from "../../Login/login/SystemErrorMessage.tsx";
import SystemSuccessMessage from "../../Login/login/SystemSuccessMessage.tsx";
import { ICategories } from "../../../interface/ICategory.ts";
import useAccessToken from "../../../composables/getAccessToken.ts";
import SuccessMessage from "../../LoadingFrame/SuccessMessage.ts";
const AdminCategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategories>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const access_token = useAccessToken();

  const submitCategories = async (data: ICategories) => {
    try {
      const response = await fetch("http://localhost:8686/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization' : `Bearer ${access_token}` },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        SuccessMessage("Thêm sản phẩm thành công");
        handleNavigation();
        reset();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const resetInfo = () => {
    reset();
  }

  const onFormError: SubmitErrorHandler<ICategories> = (errors, event) => {
    console.log("Form submission error:", errors);
  };

  const handleNavigation = () => {
    nav.handleSetMode("lists");
    navigate(-1);
  };

  return (
    <div>
      <AdminNavigation />
      <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">Thông tin chi tiết</h1>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px]">
              <div>
                <Button
                  variant="contained"
                  className="bg-[#899BE0]"
                  onClick={handleNavigation}
                >
                  <div className="flex items-center gap-[10px]">
                   <KeyboardReturnIcon></KeyboardReturnIcon>
                    <span>Trở về</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 px-8 py-4 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={handleSubmit(submitCategories, onFormError)}
            className="w-full h-full"
          >
            <div className="flex flex-col justify-between h-full gap-[30px]">
              <div className="flex flex-row justify-between w-full ">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Tên danh mục: *
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.name && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.name.message}
                    </h1>
                  )}
                </label>
              </div>
              <div className="flex-1">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Mô tả
                  <textarea
                    {...register("description")}
                    className="w-full h-[300px] p-2 border-2 border-solid border-black"
                  />
                  {errors.description && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.description.message}
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


export default AdminCategoryAdd;
