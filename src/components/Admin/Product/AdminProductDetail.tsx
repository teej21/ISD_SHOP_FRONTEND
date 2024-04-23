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
const AdminProductDetail = () => {

  const [productInfo, setProductInfo] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    thumbnailImage: null,
    category: { id: "", name: "", description: "" },
    material: "",
    width: 0,
    status: "",
    height: 0,
    publishYear: 0,
  });

  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const access_token = useAccessToken();
  const { id } = useParams();

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
          localStorage.setItem("data", data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails()
  }, [access_token, id]);

  const handleNavigation = () => {
    nav.handleSetMode("products");
    navigate(-1);
  };



  return (
    <div>
      <AdminNavigation />
      <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Chi tiết hàng hóa
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
          <div className="w-full h-full mt-[-30px]">
            <div className="flex flex-row justify-between items-center h-full gap-[70px]">
              <div className="flex flex-col justify-between h-[80%] w-full">
                <div className="flex flex-col text-xl font-bold gap-[10px]">
                 Tên tranh:
                 <div className="w-full p-2 border-2 border-solid border-black">
                    {productInfo.name}
                 </div>
                </div>
                <div className="flex flex-col text-xl font-bold gap-[10px]">
                 Mô tả:
                 <div className="w-full p-2 border-2 border-solid border-black">
                    {productInfo.description}
                 </div>
                </div>
                <div className="flex flex-col text-xl font-bold gap-[10px]">
                 Danh mục:
                 <div className="w-full p-2 border-2 border-solid border-black">
                    {productInfo.category.name}
                 </div>
                </div>
                <div className="flex flex-col text-xl font-bold gap-[10px]">
                 Giá Tiền:
                 <div className="w-full p-2 border-2 border-solid border-black">
                    {productInfo.price}
                 </div>
                </div>
              </div>
              <div className="flex flex-col justify-between h-[80%] w-full">
                <div className="flex flex-row justify-between items-center">
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Ảnh sản phẩm:
                    <div className="flex flex-row justify-between items-center gap-[100px]">
                      <div className="w-[200px] h-[150px] border border-dashed border-2 border-[#AABEE7] bg-[#F5F5F5]">
                        {productInfo.thumbnailImage ? <img
                          src={productInfo.thumbnailImage.name}
                          alt="product thumbnail"
                          className="w-full h-full object-contain"
                        /> : <p>No image</p>}
                      </div>
                    </div>
                 </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-[30px] ">
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Chất liệu:
                    <div className="w-full p-2 border-2 border-solid border-black">
                      {productInfo.material}
                    </div>
                 </div>
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Năm sáng tác:
                    <div className="w-full p-2 border-2 border-solid border-black">
                      {+productInfo.publishYear}
                    </div>
                 </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-[30px]">
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Chiều dài:
                    <div className="w-full p-2 border-2 border-solid border-black">
                      {+productInfo.height}
                    </div>
                 </div>
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Chiều rộng:
                    <div className="w-full p-2 border-2 border-solid border-black">
                      {+productInfo.width}
                    </div>
                 </div>
                </div>
                <div className="w-full">
                 <div className="flex flex-col text-xl font-bold gap-[10px]">
                    Tình trạng:
                    <div className="w-full p-2 border-2 border-solid border-black">
                      {productInfo.status}
                    </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default AdminProductDetail;