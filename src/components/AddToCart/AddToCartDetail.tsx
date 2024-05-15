import React, { useContext, useState } from "react";
import { CartContext } from "../../context/AddToCartContext.tsx";
import { useEffect } from "react";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Product_additional_detail from "../Product_detail/Product_additional_detail.tsx";
const AddToCartDetail = () => {
  const productList = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      productList.AddToCartProductList.forEach((product) => {
        totalPrice += product.price;
      });
      setTotalPrice(totalPrice);
    };
    calculateTotal();
  }, []);

  const handleNav = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="p-16">
        <span className="font-bold text-[#8D8D8D]">TRANG CHỦ /</span>
        <span className="font-bold text-[#8D8D8D] ml-[10px]">GIỎ HÀNG</span>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-[#8D8D8D] text-center">
          Giỏ Hàng
        </h1>
      </div>
      {productList.AddToCartProductList.length > 0 ? (
        <div className="flex flex-row justify-between max-w-[1800px] mx-auto mt-[50px] gap-[50px]">
          <div className="flex flex-col basis-[50%] gap-[10px]">
            <div className="flex flex-row justify-between items-center text-xl font-bold">
              <div><h1>SẢN PHẨM</h1></div>
              <div><h1>GIÁ</h1></div>
              <div><h1>SỐ LƯỢNG</h1></div>
              <div className="flex basis-[20%]"><h1>TỔNG CỘNG</h1></div>
            </div>
            <div className="flex flex-col justify-between">
              {productList.AddToCartProductList.map((product) => (
                <div className="flex flex-col">
                  <hr className="h-[2px] w-full bg-[#E9E9E9] my-[15px]"></hr>
                  <div
                    key={product.id}
                    className="flex flex-row justify-between items-center"
                  >
                    <div className="flex flex-row items-center gap-[10px] basis-[50%]">
                      <img
                        src={product.thumbnail}
                        alt={product.id}
                        className="max-w-32 max-h-32 object-contain"
                      ></img>
                      <span className="text-xl font-bold">{product.name}</span>
                    </div>
                    <div className="flex basis-[50%] grow-0">
                      <span className="text-xl text-red-500 font-bold">
                        {" "}
                        {new Intl.NumberFormat("vi-en").format(product.price)}đ
                      </span>
                    </div>
                    <div className="flex basis-[45%]">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <div className="flex basis-[30%]">
                      <span className="text-xl text-red-500 font-bold">
                        {" "}
                        {new Intl.NumberFormat("vi-en").format(product.price)}đ
                      </span>
                    </div>
                    <div><DeleteIcon className="hover:text-[#DF6A6A]" onClick={() => productList.deleteAddToCartProduct(product.id)}></DeleteIcon></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[2px] h-[400px] bg-[#E9E9E9]"></div>
          <div className="flex flex-col gap-[20px] flex-1">
            <div>
              <h1 className="text-3xl font-bold">Tổng số lượng</h1>
            </div>
            <hr className="h-[2px] w-full bg-[#E9E9E9]"></hr>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-xl font-bold">Tổng tiền</h1>
              <p className="text-xl text-red-500 font-bold">
                {new Intl.NumberFormat("vi-en").format(totalPrice)}đ
              </p>
            </div>
            <hr className="h-[2px] w-full bg-[#E9E9E9]"></hr>
            <Button className="bg-[#DF6A6A] py-4">
              <p className="text-xl font-bold text-white">
                Tiến hành thanh toán!
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[20px]">
          <p className="text-center py-8 text-2xl font-bold">
            Bạn chưa mua sản phẩm nào cả, xin hãy mua sản phẩm để tiếp tục!
          </p>
          <Button onClick={handleNav} className="bg-[#DF6A6A] text-white text-xl font-bold w-[300px] mx-auto p-4 cursor-pointer">
           Quay về trang chủ
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartDetail;
