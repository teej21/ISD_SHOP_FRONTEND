import React from "react";
import { Button } from "@mui/material";
import OrderPicture from "../../../assets/order_pic.jpg";

const Orders = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex min-[930px]:flex-row flex-col-reverse justify-between gap-[40px] bg-[#BBAB9E] lg:w-full w-8/10 max-w-[1200px] mx-auto rounded-[50px]">
        <div className="flex flex-col gap-[20px] min-[930px]:w-6/10 items-center">
          <div className="lg:px-16 w-8/10 min-[930px]:mt-32 ">
            <h1 className="font-bold text-white text-xl">
              VẼ TRANH THEO YÊU CẦU
            </h1>
            <p className="text-white font-bold text-sm text-justify">
              Bạn có những bức hình gia đình hoặc phong cảnh hoặc bất cứ hình
              ảnh nào bạn muốn chuyển thành tranh vẽ? Hãy liên hệ với chúng tôi
              để biến yêu cầu của bạn thành hiện thực!
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-[15px] lg:p-0 py-4">
            <Button
              variant="contained"
              className="bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              TÌM HIỂU THÊM
            </Button>
            <Button
              variant="contained"
              className="bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              GỬI YÊU CẦU
            </Button>
          </div>
        </div>
        <div className="relative min-[930px]:w-[500px] min-[930px]:h-[500px]">
          <img
            src={OrderPicture}
            className="w-full h-full object-cover rounded-[15px]"
            alt="Order Picture"
          />
        </div>
      </div>

      <div className="flex min-[930px]:flex-row-reverse flex-col-reverse justify-between gap-[40px] bg-[#917F86] lg:w-full w-8/10 max-w-[1200px] mx-auto rounded-[50px]">
        <div className="flex flex-col gap-[20px] min-[930px]:w-6/10 items-center">
          <div className="lg:px-16 w-8/10 min-[930px]:mt-32 ">
            <h1 className="font-bold text-white text-xl">
              MUA BÁN TRANH ONLINE
            </h1>
            <p className="text-white font-bold text-sm text-justify">
              Bạn có tranh nghệ thuật và muốn bán trên AnNhien.com ? Tham gia và
              hợp tác với chúng tôi ngay hôm nay.
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-[15px] lg:p-0 py-4">
            <Button
              variant="contained"
              className="bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              TÌM HIỂU THÊM
            </Button>
            <Button
              variant="contained"
              className="bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              GỬI YÊU CẦU
            </Button>
          </div>
        </div>
        <div className="relative min-[930px]:w-[500px] min-[930px]:h-[500px]">
          <img
            src={OrderPicture}
            className="w-full h-full object-cover rounded-[15px]"
            alt="Order Picture"
          />
        </div>
      </div>

      <div className="flex min-[930px]:flex-row flex-col-reverse justify-between gap-[40px] bg-[#A36EA0] lg:w-full w-8/10 mx-auto rounded-[50px] max-w-[1200px]">
        <div className="flex flex-col gap-[20px] min-[930px]:w-6/10 items-center">
          <div className="lg:px-16 w-8/10 min-[930px]:mt-32 ">
            <h1 className="font-bold text-white text-xl">
              TÌM TRANH BẠN YÊU THÍCH
            </h1>
            <p className="text-white font-bold text-base ">
              Bạn đang muốn khám phá một nghệ sĩ mới, thêm một tác phẩm mới vào
              ngôi nhà của mình? Tư vấn viên sẽ giúp bạn khám phá và mua hàng từ
              những nghệ sĩ mới nổi giỏi nhất.
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-[15px] lg:p-0 py-4">
            <Button
              variant="contained"
              className=" bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              TÌM HIỂU THÊM
            </Button>
            <Button
              variant="contained"
              className="bg-transparent border border-white border-2 border-solid rounded-[15px] hover:bg-white hover:text-[#6A7878] hover:font-bold"
            >
              GỬI YÊU CẦU
            </Button>
          </div>
        </div>
        <div className="relative min-[930px]:w-[500px] min-[930px]:h-[500px]">
          <img
            src={OrderPicture}
            className="w-full h-full object-cover rounded-[15px]"
            alt="Order Picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
