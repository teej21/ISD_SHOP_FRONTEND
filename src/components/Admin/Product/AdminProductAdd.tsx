import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavigation from "../AdminNavigation.tsx";
import schema from "../../../validation/AddProductForm.ts";
import { AddUser } from "../../../interface/IUSerInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import { ICategories } from "../../../interface/ICategory.ts";
import { Product, Status } from "../../../interface/IProduct.ts";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAccessToken from "../../../composables/getAccessToken.ts";
import SystemSuccessMessage from "../../Login/login/SystemSuccessMessage.tsx";
import AdminHorizontal from "../AdminHorizontal.tsx";
import SuccessMessage from "../../LoadingFrame/SuccessMessage.ts";

const AdminProductAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({ resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<String[]>([]);
  const [message, setMessage] = useState<"">("");
  const [productInfo, setProductInfo] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    thumbnailImage: null,
    categoryId: 1,
    material: "",
    width: 0,
    height: 0,
    publishYear: 0,
    status: "AVAILABLE",
  });
  const [categories, setCategories] = useState<ICategories[]>([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const { accessToken, loading } = useAccessToken();

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await fetch("http://localhost:8686/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerList();
  }, []);

  const submitProduct = async () => {
    try {
      const formData = new FormData();
      const keys = Object.keys(productInfo);
      keys.forEach((key) => {
        formData.append(key, productInfo[key]);
      });

      const response = await fetch("http://localhost:8686/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        SuccessMessage("Thêm sản phẩm thành công!");
        handleNavigation();
        reset();
      } else {
        const errorData = await response.json();
        setErrorMessage([errorData.error]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const onFormError: SubmitErrorHandler<AddUser> = (errors, event) => {
    console.log("Form submission error:", errors);
  };

  const handleNavigation = () => {
    nav.handleSetMode("products");
    navigate(-1);
  };

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    const fileURL = URL.createObjectURL(target.files[0]);
    setPreview(fileURL);
    setProductInfo((product) => ({
      ...product,
      thumbnailImage: target.files[0],
    }));
  };

  const resetInfo = () => {
    setProductInfo({
    id: 0,
    name: "",
    description: "",
    price: 0,
    thumbnailImage: null,
    categoryId: 1,
    material: "",
    width: 0,
    height: 0,
    publishYear: 0,
    status: "AVAILABLE",
    })
    setPreview("");
  };

  const handleInput = (fieldName) => {
    return (event) => {
      const value = event?.target.value;
      return setProductInfo((prev) => {
        return {
          ...prev,
          [fieldName]: value,
        };
      });
    };
  };

  return (
    <div>
      <AdminHorizontal />
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        {message && <SystemSuccessMessage message={message} />}
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Quản lý hàng hóa - Thêm hàng hóa
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

        <div className="flex flex-row justify-between gap-4 px-8 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={handleSubmit(submitProduct, onFormError)}
            className="w-full h-full mt-[-30px]"
          >
            <div className="flex flex-row justify-between items-center h-full gap-[70px]">
              <div className="flex flex-col justify-between h-[80%] w-full">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Tên tranh:
                  <input
                    type="text"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("name")}
                    onChange={handleInput("name")}
                  />
                  {errors.name && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.name.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Mô tả:
                  <textarea
                    {...register("description")}
                    onChange={handleInput("description")}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.description && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.description.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Danh mục
                  <select
                    className="w-full p-2 border-2 border-solid border-black"
                    onChange={handleInput("categoryId")}
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Giá Tiền
                  <input
                    type="number"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("price")}
                    onChange={handleInput("price")}
                  />
                  {errors.price && (
                    <h1 className="text-red-500 font-bold text-xl">
                      {errors.price.message}
                    </h1>
                  )}
                </label>
              </div>
              <div className="flex flex-col justify-between h-[80%] w-full">
                <div className="flex flex-row justify-between items-center">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Ảnh sản phẩm
                    <div className="flex flex-row justify-between items-center gap-[100px]">
                      {!preview && (
                        <div className="w-[200px] h-[150px] border border-dashed border-2 border-[#AABEE7] bg-[#F5F5F5]">
                          <div>
                            <div className="w-[60px] h-[60px] mx-auto my-2">
                              <AddPhotoAlternateIcon className="w-full h-full"></AddPhotoAlternateIcon>
                            </div>
                            <div className="px-4">
                              <span className="text-base">
                                Kéo hình ảnh vào đây hoặc{" "}
                                <span className="underline text-[#2A3598]">
                                  tải tệp lên
                                </span>
                              </span>
                            </div>
                          </div>
                          <input
                            type="file"
                            className="w-full h-full hidden"
                            {...register("thumbnailImage")}
                            onChange={handleImageChange}
                            accept="image/png, image/jpg"
                          ></input>
                        </div>
                      )}
                      {preview && (
                        <div className="w-[200px] h-[150px]">
                          <input
                            type="file"
                            className="w-full h-full hidden"
                            {...register("thumbnailImage")}
                            onChange={handleImageChange}
                            accept="image/png, image/jpg"
                          ></input>
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-contain"
                          ></img>
                        </div>
                      )}
                      {errors.thumbnailImage && (
                        <h1 className="text-red-500 font-bold text-xl">
                          {errors.thumbnailImage.message}
                        </h1>
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex flex-row justify-between items-center gap-[30px] ">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chất liệu
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-solid border-black"
                      {...register("material")}
                      onChange={handleInput("material")}
                    ></input>
                    {errors.material && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.material.message}
                      </h1>
                    )}
                  </label>
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Năm sáng tác
                    <input
                      type="number"
                      {...register("publishYear")}
                      onChange={handleInput("publishYear")}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.publishYear && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.publishYear.message}
                      </h1>
                    )}
                  </label>
                </div>
                <div className="flex flex-row justify-between items-center gap-[30px]">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chiều dài
                    <input
                      type="number"
                      {...register("height")}
                      onChange={handleInput("height")}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.height && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.height.message}
                      </h1>
                    )}
                  </label>
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chiều rộng
                    <input
                      type="number"
                      {...register("width")}
                      onChange={handleInput("width")}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.width && (
                      <h1 className="text-red-500 font-bold text-xl">
                        {errors.width.message}
                      </h1>
                    )}
                  </label>
                </div>
                <div className="w-full">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Tình trạng
                    <div className="w-full p-2 border-2 border-solid border-black">
                      <select>
                        <option selected disabled value="AVAILABLE">
                          AVAILABLE
                        </option>
                      </select>
                    </div>
                  </label>
                </div>
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

export default AdminProductAdd;
