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
import AdminHorizontal from "../AdminHorizontal.tsx";
export interface ResponseBody {
  name: string,
  description: string,
  price: number,
  thumbnail: string | null,
  category: ICategories,
  material: string,
  width: Number,
  status: string,
  height: Number,
  publishYear: Number,
}

const AdminProductDetail = () => {

  const [productInfo, setProductInfo] = useState<ResponseBody>({
    name: "",
    description: "",
    price: 0,
    thumbnail: null,
    category: { id: 0, name: "", description: "" },
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
        const data : ResponseBody = await response.json();
        if (response.ok) {
          setProductInfo(data);
          console.log(data.status);

          fetchImage(data.thumbnail);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchImage = async (thumbnail) => {
      try {
        console.log(thumbnail);
        const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`);
        console.log(response);
        const image : Blob = await response.blob();
        const outputImage = URL.createObjectURL(image);
        if (response.ok) {
          setProductInfo(data => ({...data, thumbnail: outputImage}));
          console.log(image);
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [id]);


  const handleNavigation = () => {
    nav.handleSetMode("products");
    navigate(-1);
  };



  return (
    <div>
      <AdminHorizontal />
      <div className="absolute top-[55%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Chi tiết hàng hóa
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
                      <div className="w-[200px] h-[150px] border border-dashed border-2 border-[#AABEE7] bg-[#F5F5F5] relative">
                        {productInfo.thumbnail ? <div className="w-[200px] h-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><img
                          src={`${productInfo.thumbnail}`}
                          alt="product thumbnail"
                          className="w-full h-full object-contain"
                        /></div> : <p>No image</p>}
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