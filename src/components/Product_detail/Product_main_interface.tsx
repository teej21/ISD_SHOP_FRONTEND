import React from "react";
import Picture_2 from "../../assets/pic_2.png";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Button } from "@mui/material";
import Pinterest from "@mui/icons-material/Pinterest";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Product_main_interface = () => {
  return (
    <div>
      <div className="flex flex-row gap-[50px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-row mt-[30px] gap-[20px]">
            <span className="font-bold text-[#8D8D8D]">TRANG CHỦ </span>
            <span className="font-bold text-[#8D8D8D]">TRANH TRỪU TƯỢNG</span>
          </div>
          <div className="w-[600px] h-[500px] relative">
            <img
              src={Picture_2}
              alt="img_detail"
              className="h-full w-full object-cover"
            ></img>
             <FavoriteIcon className="xl:w-[40px] xl:h-[40px] w-[20px] height-[20px] text-white border border-2 border-solid border-white p-2 absolute top-3 right-3 rounded-full hover:text-white hover:bg-red-500 hover:border-red-500 transition duration-300 ease-out" />
          </div>
          <div>
            <Button variant="contained" className="bg-[#472A4B] pr-12 py-4 rounded-[10px] ">
              <ZoomOutMapIcon className="mr-[30px]"></ZoomOutMapIcon>
              <span className="text-xl font-bold cursor">
                PHÓNG TO
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] my-24">
          <div>
            <span className="text-3xl font-bold">THÀNH PHỐ BIỂN</span>
            <div className="h-2 w-[20%] bg-[#D9D9D9] mt-[5px]"></div>
          </div>
          <div>
            <span className="text-lg text-[#BF3744] font-bold">12.000.000đ</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[#8F8667] font-bold text-xl">
            <span>Chất liệu: Acrylic on canvas</span>
            <span>Kích thước: 80 x 100 (cm)</span>
            <span>Năm sáng tác: 2022</span>
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-[#DF6A6A] rounded-[10px] p-4 text-xl font-bold"
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
            <span>Mã: 11111</span>
            <hr></hr>
            <span>Số lượt xem: 100000</span>
            <hr></hr>
            <span>Danh mục: Tranh Phong cảnh, Tranh Trừu Tượng</span>
            <hr></hr>
            <div className="flex flex-row gap-[10px] items-center">
            <span>Chia sẻ</span>
            <div className="flex flex-row gap-[5px]">
            <FacebookIcon className=" rounded-full border border-2 border-solid border-[#8F8667] w-[40px] h-[40px] p-2 hover:bg-[blue] hover:text-white transition duration-300 ease-in-out"/>
            <XIcon className=" rounded-full border border-2 border-solid border-[#8F8667] w-[40px] h-[40px] p-2 hover:bg-[black] hover:text-white transition duration-300 ease-in-out"/>
            <Pinterest className=" rounded-full border border-2 border-solid border-[#8F8667] w-[40px] h-[40px] p-2 hover:bg-[red] hover:text-white transition duration-300 ease-in-out"/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_main_interface;
