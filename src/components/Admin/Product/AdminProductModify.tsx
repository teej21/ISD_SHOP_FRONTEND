import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavigation from "../AdminNavigation.tsx";
import schema from "../../../validation/AddProductForm.ts";
import { AddUser } from "../../../interface/IUSerInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import { ICategories } from "../../../interface/ICategory.ts";
import { Product, Status } from "../../../interface/IProduct.ts";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAccessToken from "../../../composables/getAccessToken.ts";
const AdminProductModify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({ resolver: zodResolver(schema) });
  const [errorMessage, setErrorMessage] = useState<String>();
  const [message, setMessage] = useState<string>("");
  const [productInfo, setProductInfo] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    thumbnail: null,
    category: { id: "", name: "", description: "" },
    material: "",
    width: 0,
    status: "",
    height: 0,
    publishYear: 0,
  });
  const [categories, setCategories] = useState<ICategories[]>([
    {
      id: "",
      name: "",
      description: "",
    },
  ]);

  const [file, setFile] = useState<File | undefined>();
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const access_token = useAccessToken();
  const { id } = useParams();
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await fetch("http://localhost:8686/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setCategories(data);
          }
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryList();
  }, [access_token]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8686/products/${id}`, {
          method: 'GET',
          headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${access_token}`}
        });
        const data = await response.json();
        if (response.ok) {
          setProductInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails()
  }, [access_token, id]);

  const resetInfo = () => {
    setProductInfo({
      id: "",
      name: "",
      description: "",
      price: 0,
      thumbnail: null,
      category: { id: "", name: "", description: "" },
      material: "",
      width: 0,
      status: "",
      height: 0,
      publishYear: 0,
    });
  }

  const handleInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
   
  const submitProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      formData.append("id", String(productInfo.category.id));
      formData.append("material", productInfo.material);
      formData.append("width", String(productInfo.width));
      formData.append("height", String(productInfo.height));
      formData.append("publishYear", String(productInfo.publishYear));
      if (file) {
        formData.append("thumbnailImage", file);
        console.log("Image found");
      }
      console.log(formData);

      const response = await fetch("http://localhost:8686/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseBody = await response.json();
        setMessage(responseBody.result);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        console.log(response);
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
      files: FileList;
    };
    setFile(target.files[0]);

    localStorage.setItem("file", target.files[0].name);
  };


  return (
    <div>
      <AdminNavigation />
      <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        {/* {message && <SystemSuccessMessage message={message}/>}
      {errorMessage.length > 0 && <SystemErrorMessage message={errorMessage}/>} */}
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Quản lý hàng hóa - Thêm hàng hóa
              </h1>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="rounded-[50px] border-[E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
                />
                <div className="absolute right-3 top-3">
                  <SearchIcon className="text-[#A2A3A6]"></SearchIcon>
                </div>
              </div>
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
                    onChange={handleInfo}
                    value={productInfo.name}
                  />
                  {errors.name && (
                    <h1 className="text-red-500 font-bold text-base">
                      {errors.name.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Mô tả:
                  <textarea
                    {...register("description")}
                    onChange={handleInfo}
                    value={productInfo.description}
                    className="w-full p-2 border-2 border-solid border-black"
                  />
                  {errors.description && (
                    <h1 className="text-red-500 font-bold text-base">
                      {errors.description.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Danh mục
                  <select
                    {...register("category.name")}
                    onChange={handleInfo}
                    className="w-full p-2 border-2 border-solid border-black"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category?.name && (
                    <h1 className="text-red-500 font-bold text-base">
                      {errors.category?.name.message}
                    </h1>
                  )}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Giá Tiền
                  <input
                    type="number"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("price")}
                    onChange={handleInfo}
                    value={productInfo.price}
                  />
                  {errors.price && (
                    <h1 className="text-red-500 font-bold text-base">
                      {errors.price.message}
                    </h1>
                  )}
                </label>
              </div>
              <div className="flex flex-col justify-between h-[80%] w-full">
                <div className="flex flex-row justify-between items-center">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Ảnh sản phẩm
                    <div className="w-[200px] h-[150px] border border-dashed border-2 border-[#AABEE7] bg-[#F5F5F5]">
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
                      <input
                        type="file"
                        className="w-full h-full hidden"
                        {...register("thumbnail")}
                        onChange={handleImageChange}
                        accept="image/png, image/jpg"
                      ></input>
                    </div>
                    {errors.thumbnail && (
                      <h1 className="text-red-500 font-bold text-base">
                        {errors.thumbnail.message}
                      </h1>
                    )}
                  </label>
                </div>
                <div className="flex flex-row justify-between items-center gap-[30px] ">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chất liệu
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-solid border-black"
                      {...register("material")}
                      onChange={handleInfo}
                      value={productInfo.material}
                    ></input>
                    {errors.material && (
                      <h1 className="text-red-500 font-bold text-base">
                        {errors.material.message}
                      </h1>
                    )}
                  </label>
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Năm sáng tác
                    <input
                      type="number"
                      {...register("publishYear")}
                      onChange={handleInfo}
                      value={productInfo.publishYear}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.publishYear && (
                      <h1 className="text-red-500 font-bold text-base">
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
                      onChange={handleInfo}
                      value={productInfo.height}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.height && (
                      <h1 className="text-red-500 font-bold text-base">
                        {errors.height.message}
                      </h1>
                    )}
                  </label>
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Chiều rộng
                    <input
                      type="number"
                      {...register("width")}
                      onChange={handleInfo}
                      value={productInfo.width}
                      className="w-full p-2 border-2 border-solid border-black"
                    />
                    {errors.width && (
                      <h1 className="text-red-500 font-bold text-base">
                        {errors.width.message}
                      </h1>
                    )}
                  </label>
                </div>
                <div className="w-full">
                  <label className="flex flex-col text-xl font-bold gap-[10px]">
                    Tình trạng
                    <select className="w-full p-2 border-2 border-solid border-black">
                      <option value="STOCKOUT">Đã bán</option>
                      <option value="AVAILABLE">Đang bán</option>
                      <option value="ORDERED">Có người đặt</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-[40px]">
              <Button
                type="submit"
                className="bg-emerald-600 text-white text-xl font-bold font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900 hover:font-bold"
              >
                Thêm
              </Button>
              <Button
                className="bg-emerald-600 text-white text-xl font-bold font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900 hover:font-bold"
                onClick={resetInfo}
              >
                Đặt lại
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModify;
