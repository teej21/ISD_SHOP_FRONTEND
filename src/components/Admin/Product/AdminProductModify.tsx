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
import { Status } from "../../../interface/IProduct.ts";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useAccessToken from "../../../composables/getAccessToken.ts";
export interface ResponseBody {
  name: string,
  description: string,
  price: number,
  thumbnailImage: File | null,
  categoryId: number,
  material: string,
  width: Number,
  status: string,
  height: Number,
  publishYear: Number,
}

const AdminProductModify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResponseBody>({ resolver: zodResolver(schema) });
  const [productInfo, setProductInfo] = useState<ResponseBody>({
    name: "",
    description: "",
    price: 0,
    thumbnailImage: null,
    categoryId: 1,
    material: "",
    width: 0,
    status: "AVAILABLE",
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

  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const access_token = useAccessToken();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerList = async () => {
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
          console.log(data);
          setCategories(data);
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerList();
  }, [])

    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8686/products/${id}`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${access_token}`}
          });
          const data = await response.json();
          if (response.ok) {
            const modifiedData = {
              ...data,
              categoryId: data.category.id 
            };
            setProductInfo(modifiedData);
            fetchImage(data.thumbnail);
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      const fetchImage = async (thumbnail) => {
        try {
          const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`);
          const image : Blob = await response.blob();
          const outputImage = URL.createObjectURL(image);
          if (response.ok) {
            setPreview(outputImage)
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchProductDetails();
    }, [id]);

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


  const submitProduct = async () => {
    console.log(productInfo);
    try {
      const formData = new FormData();

      console.log("submit infor::", productInfo);

      const keys = Object.keys(productInfo);
      keys.forEach((key) => {
        console.log(productInfo[key]);
          formData.append(key, productInfo[key]);
      });
      formData.delete("thumbnail");
      formData.append("thumbnailImage", String(productInfo.thumbnailImage))
      console.log(formData.get("thumbnailImage"));
      const response = await fetch("http://localhost:8686/products/" + id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert("Chỉnh sửa thành công!");
        handleNavigation();
        resetInfo();
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
    console.log(target.files[0]);
    
    setPreview(fileURL);
    setProductInfo((product) => ({
      ...product,
      thumbnailImage: target.files[0],
    }));
    
  };

  const resetInfo = () => {
    reset();
  };

  return (
    <div>
      <AdminNavigation />
      <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
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
                    onChange={handleInput("name")}
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
                    className="w-full p-2 border-2 border-solid border-black"
                    onChange={handleInput("description")}
                    value={productInfo.description}
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
                    className="w-full p-2 border-2 border-solid border-black"
                    onClick={handleInput("categoryId")}
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
                    <div className="flex flex-row justify-between items-center gap-[100px]">
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
                          {...register("thumbnailImage")}
                          onChange={handleImageChange}
                          accept="image/png, image/jpg"
                        ></input>
                      </div>
                      {preview && (
                        <div className="w-[200px] h-[150px]">
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-contain"
                          ></img>
                        </div>
                      )}
                      {errors.thumbnailImage && (
                        <h1 className="text-red-500 font-bold text-base">
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
                      onChange={handleInput("publishYear")}
                      value={+productInfo.publishYear}
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
                      onChange={handleInput("height")}
                      value={+productInfo.height}
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
                      onChange={handleInput("width")}
                      value={+productInfo.width}
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
                    <select
                      className="w-full p-2 border-2 border-solid border-black"
                      onChange={(e) => handleInput(e.target.value)}
                    >
                      <option value={Status.STOCKOUT}>Đã bán</option>
                      <option value={Status.AVAILABLE}>Đang bán</option>
                      <option value={Status.ORDERED}>Có người đặt</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-[40px]">
              <Button
                onClick={submitProduct}
                type="button"
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
