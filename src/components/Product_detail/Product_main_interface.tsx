import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Picture_2 from "../../assets/pic_2.png";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Button } from "@mui/material";
import Pinterest from "@mui/icons-material/Pinterest";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/AddToCartContext.tsx";

const Product_main_interface = () => {
  const productInfo = useContext(CartContext);


  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      productInfo.setAddToCartProductList(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(productInfo.AddToCartProductList));
  }, [productInfo.AddToCartProductList]);
  
  const { id } = useParams();
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(isLike => !isLike);
  }
  useEffect(() => {
    const fetchProduct = () => {
      productInfo.fetchProductDetails(id);
    }
    
    fetchProduct();
  }, [id]);

  return (
    <div>
      <div className="flex flex-row gap-[50px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-row mt-[30px] gap-[5px]">
            <span className="font-bold text-[#8D8D8D]">TRANG CHỦ /</span>
            <span className="font-bold text-[#8D8D8D]">
              {productInfo.productInfo.categoryName}
            </span>
          </div>
          <div className="w-[600px] h-[500px] relative">
            <img
              src={productInfo.productInfo.thumbnail}
              alt="img_detail"
              className="h-full w-full object-cover"
            ></img>
            {isLike ? <FavoriteIcon className="xl:w-[40px] xl:h-[40px] w-[20px] height-[20px] text-white border border-2 border-solid border-white p-2 absolute top-3 right-3 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-300 ease-out" 
            onClick={handleLike} /> : <FavoriteIcon className="xl:w-[40px] xl:h-[40px] w-[20px] height-[20px] p-2 absolute top-3 right-3 rounded-full text-white bg-red-500 hover:border-red-500 transition duration-300 ease-out" onClick={handleLike}/>}
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-[#472A4B] pr-12 py-4 rounded-[10px] "
            >
              <ZoomOutMapIcon className="mr-[30px]"></ZoomOutMapIcon>
              <span className="text-xl font-bold cursor">PHÓNG TO</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] my-24">
          <div>
            <span className="text-3xl font-bold">{productInfo.productInfo.name}</span>
            <div className="h-2 w-[20%] bg-[#D9D9D9] mt-[5px]"></div>
          </div>
          <div>
            <span className="text-lg text-[#BF3744] font-bold">
              {new Intl.NumberFormat("vi-en").format(productInfo.productInfo.price)}đ
            </span>
          </div>
          <div className="flex flex-col gap-[10px] text-[#8F8667] font-bold text-xl">
            <span>Chất liệu: {productInfo.productInfo.material}</span>
            <span>Kích thước: {productInfo.productInfo.width} x {productInfo.productInfo.height} (cm)</span>
            <span>Năm sáng tác: {productInfo.productInfo.publishYear}</span>
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-[#DF6A6A] rounded-[10px] p-4 text-xl font-bold"
              onClick={productInfo.handleAddToCart}
            >
              THÊM VÀO GIỎ
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-[#FB6E2E] rounded-[10px] px-9 py-4 text-xl font-bold"
            >
              MUA NGAY
            </Button>
          </div>
          <div className="flex flex-col gap-[10px] text-[#8F8667] text-lg font-bold">
            <span>Mã: {productInfo.productInfo.id}</span>
            <hr></hr>
            <span>Danh mục: {productInfo.productInfo.categoryName}</span>
            <hr></hr>
            <div className="flex flex-row gap-[10px] items-center">
            <span>Trạng thái: {productInfo.productInfo.status}</span>
            </div>
          </div>
        </div>
      </div>
      <h1>{productInfo.announcement}</h1>
    </div>
  );
};

export default Product_main_interface;
