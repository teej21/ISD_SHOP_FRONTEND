import React from "react";
import { Button } from "@mui/material";
import OrderPicture from "../../../assets/offer.png";
import OrderPicture2 from "../../../assets/gallery.png";
import OrderPicture3 from "../../../assets/artwork.png";
const Orders = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex min-[930px]:flex-row flex-col-reverse justify-between gap-[40px] bg-[#BBAB9E] lg:w-full w-8/10 max-w-[1200px] mx-auto rounded-[50px]">
        <div className="flex flex-col gap-[20px] min-[930px]:w-6/10 items-center">
          <div className="lg:px-16 w-8/10 min-[930px]:mt-32 ">
            <h1 className="font-bold text-white md:text-2xl text-xl">
              VẼ TRANH THEO YÊU CẦU
            </h1>
            <p className="text-white font-bold md:text-lg text-base text-justify mt-[10px]">
              Bạn có những bức hình gia đình hoặc phong cảnh hoặc bất cứ hình
              ảnh nào bạn muốn chuyển thành tranh vẽ? Hãy liên hệ với chúng tôi
              để biến yêu cầu của bạn thành hiện thực!
            </p>
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
            <h1 className="font-bold text-white md:text-2xl text-xl">
              MUA BÁN TRANH ONLINE
            </h1>
            <p className="text-white font-bold md:text-lg text-base text-justify mt-[10px]">
              Bạn có tranh nghệ thuật và muốn bán trên AnNhien.com ? Tham gia và
              hợp tác với chúng tôi ngay hôm nay.
            </p>
          </div>
        </div>
        <div className="relative min-[930px]:w-[500px] min-[930px]:h-[500px]">
          <img
            src={OrderPicture2}
            className="w-full h-full object-cover rounded-[15px]"
            alt="Order Picture"
          />
        </div>
      </div>

      <div className="flex min-[930px]:flex-row flex-col-reverse justify-between gap-[40px] bg-[#A36EA0] lg:w-full w-8/10 mx-auto rounded-[50px] max-w-[1200px]">
        <div className="flex flex-col gap-[20px] min-[930px]:w-6/10 items-center">
          <div className="lg:px-16 w-8/10 min-[930px]:mt-32 ">
            <h1 className="font-bold text-white md:text-2xl text-xl">
              TÌM TRANH BẠN YÊU THÍCH
            </h1>
            <p className="text-white font-bold md:text-lg text-base text-justify mt-[10px] ">
              Bạn đang muốn khám phá một nghệ sĩ mới, thêm một tác phẩm mới vào
              ngôi nhà của mình? Tư vấn viên sẽ giúp bạn khám phá và mua hàng từ
              những nghệ sĩ mới nổi giỏi nhất.
            </p>
          </div>
        </div>
        <div className="relative min-[930px]:w-[500px] min-[930px]:h-[500px]">
          <img
            src={OrderPicture3}
            className="w-full h-full object-cover rounded-[15px]"
            alt="Order Picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
