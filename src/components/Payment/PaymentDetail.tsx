import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/AddToCartContext.tsx";
import { useForm } from "react-hook-form";
import schema, { InputForm } from "../../validation/PaymentForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import useAccessToken from "../../composables/getAccessToken.ts";
import modifyConfirmation from "../../composables/modifyConfirmation.ts";
import { useNavigate } from "react-router-dom";
import getOrderById from "../../composables/getOrderById.ts";
import getOrderProductDetail from "../../composables/getOrderProductDetail.ts";
const PaymentDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({ resolver: zodResolver(schema) });
  const addToCartList = useContext(CartContext);
  const accessToken = localStorage.getItem("access_token");
  const userId : string | null = localStorage.getItem("user_id");
  const navigate = useNavigate();
  
  const handleNav = () => {
    navigate('/');
    addToCartList.setAddToCartProductList([]);
  }

  useEffect(() => {
  const showPaymentProduct = async () => {
    const listOrder = await getOrderById(userId, accessToken);
    let listProduct = [];

    listOrder.forEach((order) => {
      listProduct.push(...order.orderDetailList);
    });
      
    if (userId) {
      const addToCartProducts = await Promise.all(
        listProduct.map(async (order) => {            
          return await getOrderProductDetail(accessToken, order.id);
        })
      );

      addToCartList.setAddToCartProductList(addToCartProducts);
  }
}
  showPaymentProduct();
  }, [])

  useEffect(() => {
    const calculateTotal = () => {
      addToCartList.handleTotalPrice();
     }
    calculateTotal();
  }, [addToCartList.AddToCartProductList.length]);

  const onSubmit = async (data: InputForm) => {
    try {
      if(userId){
      await modifyConfirmation(accessToken, data, handleNav, +userId);
      addToCartList.handleSuccess(11)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div>
        <h1 className="text-[#8D8D8D] text-base font-bold p-8">
          TRANG CHỦ / GIỎ HÀNG / ĐẶT HÀNG{" "}
        </h1>
      </div>
      <div className="text-center">
        <h1 className="text-[#8D8D8D] font-bold text-3xl">ĐẶT HÀNG</h1>
      </div>
      <div className="flex md:flex-row flex-col-reverse mx-auto justify-between md:items-start max-w-[1500px] mx-auto px-4">
        <div className="flex flex-col gap-[20px] basis-[50%] mt-[100px]">
          <h1 className="text-[#8D8D8D] font-bold text-2xl">
            THÔNG TIN ĐẶT HÀNG
          </h1>
          <div>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
              <label className="flex flex-col w-full text-xl gap-[10px]">
                Họ và tên *
                <input
                  type="text"
                  className="border border-2 border-solid border-black p-2"
                  {...register("name")}
                ></input>
                {errors.name && <span className="text-xl text-red-400 font-bold">{errors.name.message}</span>}
              </label>
              <label className="flex flex-col w-full text-xl gap-[10px]">
                Số điện thoại *
                <input
                  type="text"
                  className="border border-2 border-solid border-black p-2"
                  {...register("phoneNumber")}
                ></input>
                  {errors.phoneNumber && <span className="text-xl text-red-400 font-bold">{errors.phoneNumber.message}</span>}
              </label>
              <label className="flex flex-col w-full text-xl gap-[10px]">
                Địa chỉ*
                <input
                  type="text"
                  className="border border-2 border-solid border-black p-2"
                  {...register("address")}
                ></input>
                  {errors.address && <span className="text-xl text-red-400 font-bold">{errors.address.message}</span>}
              </label>
              <div className="flex flex-col gap-[20px]">
                <h1 className="text-[#8D8D8D] font-bold text-2xl">
                  THÔNG TIN BỔ SUNG{" "}
                </h1>{" "}
                <label className="flex flex-col w-full text-xl gap-[10px]">
                  Ghi chú đơn hàng(Tùy chọn)
                  <textarea
                    className="border border-2 border-solid border-black p-2 h-[200px]"
                    placeholder="Ghi chú về đơn hàng, ví dụ: Thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    {...register("note")}
                  ></textarea>
                </label>
              </div>
              <Button className="bg-[#B33141] text-white font-bold text-xl w-full py-4 mx-auto mt-[30px] md:mb-0 mb-[30px]" type="submit">Đặt hàng</Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col border border-solid border-2 border-red-500 basis-[40%] p-8 gap-[20px] mt-[100px]">
          <h1 className="text-[#8D8D8D] font-bold text-2xl ">ĐƠN HÀNG CỦA BẠN</h1>
          <h1 className="text-xl  font-bold">SẢN PHẨM</h1>
          <div className="flex flex-col gap-[20px]">{addToCartList.AddToCartProductList.map((cart) => (
            <div key={cart.product_id} className="flex flex-row justify-between items-center">
              <span className="text-xl ">{cart.product_name}</span><span className="text-xl text-[#D73F3F]">{new Intl.NumberFormat("vi-en").format(cart.product_price)}đ</span>
            </div>
          ))}</div>
          <div className="flex flex-row justify-between items-center"><span className="text-xl text-[#D73F3F] font-bold">Tổng:</span><span className="text-xl text-[#D73F3F] font-bold">{new Intl.NumberFormat("vi-en").format(addToCartList.totalPrice)}đ</span></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
