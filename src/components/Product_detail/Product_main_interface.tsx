import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/AddToCartContext.tsx";
import useAccessToken from "../../composables/getAccessToken.ts";
import SignInDialog from "../AddToCart/SignInDialog.tsx";
import SuccessMessage from "../LoadingFrame/SuccessMessage.ts";
import LoadingState from "../LoadingFrame/Loading.tsx";
import failMessage from "../LoadingFrame/FailMessage.ts";

const Product_main_interface = () => {
  const productInfo = useContext(CartContext);
  const { accessToken, loading } = useAccessToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSignInDialog, setShowSignInDialog] = useState<boolean>(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    if (accessToken) {
      productInfo.handleAddToCart();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setShowSignInDialog(true);
    }
  };

  
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = () => {
      if(id){
      const idNumber = parseInt(id)
      productInfo.fetchProductDetails(idNumber);
      }
    }
    
    fetchProduct();
  }, [id]);

  return (
    <div>
       {showSignInDialog && <SignInDialog
        open={showSignInDialog}
        handleClose={() => setShowSignInDialog(false)}
      />}
      {isLoading && <LoadingState></LoadingState>}
      <div className="flex flex-row gap-[50px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-row mt-[30px] gap-[5px]">
            <span className="font-bold text-[#8D8D8D]">TRANG CHỦ /</span>
            <span className="font-bold text-[#8D8D8D]">
              {productInfo.productInfo.categoryName}
            </span>
          </div>
          <div className="w-[600px] h-[500px] relative">
            {productInfo.productInfo.status === 'ORDERED' && <div className="absolute bg-black opacity-50 absolute w-[600px] h-[500px]"></div>}
            {productInfo.productInfo.status === 'STOCKOUT' && <div className="absolute bg-black opacity-50 absolute w-[600px] h-[500px]"></div>}  
            <img
              src={productInfo.productInfo.thumbnail}
              alt="img_detail"
              className="h-full w-full object-cover"
            ></img>
            {productInfo.productInfo.status === 'ORDERED' && <div className="text-white text-xl font-bold absolute top-0 bg-[#DF6A6A] rounded-br-full px-8 py-8">Hết hàng</div>}
            {productInfo.productInfo.status === 'STOCKOUT' && <div className="text-white text-xl font-bold absolute top-0 bg-[#DF6A6A] rounded-br-full px-8 py-8">Hết hàng</div>}  
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
              onClick={handleAddToCart}
            >
              THÊM VÀO GIỎ
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-[#FB6E2E] rounded-[10px] px-9 py-4 text-xl font-bold"
              onClick={handleAddToCart}
            >
             <Link to="/add-to-cart">MUA NGAY</Link>
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
    </div>
    
  );
};

export default Product_main_interface;
