import React from "react";
import StarIcon from "@mui/icons-material/Star";
import Textarea from "@mui/joy/Textarea";
import { Container, Card, TextField, Button } from '@mui/material'
const Product_form = () => {
  return (
    <div className="border border-red-500 border-solid border-2 p-8">
      <h1 className="font-bold text-2xl">
        Hãy là người đầu tiên nhận xét “Thành Phố Biển”
      </h1>
      <div className="my-[20px]">
        <span className="text-lg font-bold">Đánh giá của bạn *</span>
        <div className="flex flex-row items-center gap-[10px] mt-[10px]">
          <div className="flex flex-row items-center text-[#E9E9E9] hover:text-yellow-500">
            <StarIcon />
            <div className="w-2 h-full bg-[#E9E9E9]"></div>
          </div>
          <div className="flex flex-row items-center text-[#E9E9E9] hover:text-yellow-500 ">
            <StarIcon />
            <StarIcon />
            <div className="w-2 h-full bg-[#E9E9E9]"></div>
          </div>
          <div className="flex flex-row items-center text-[#E9E9E9] hover:text-yellow-500">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <div className="w-2 h-full bg-[#E9E9E9]"></div>
          </div>
          <div className="flex flex-row items-center text-[#E9E9E9] hover:text-yellow-500">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <div className="w-2 h-full bg-[#E9E9E9]"></div>
          </div>
          <div className="flex flex-row items-center text-[#E9E9E9] hover:text-yellow-500 ">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
      </div>
      <div>
        <span className="font-bold text-lg">Nhận xét của bạn *</span>
        <Textarea placeholder="Type anything…" className="h-48 mt-[20px]" />
      </div>
      <div className="flex flex-row justify-between items-center gap-[40px]">
        <div className="flex flex-col gap-[10px] mt-[20px] w-full ">
          <span className="text-lg font-bold">Tên *</span>
          <TextField id="outlined-basic" variant="outlined" className="shadow-shadow_primary"></TextField>
        </div>
        <div className="flex flex-col gap-[10px] mt-[20px] w-full shadow-shadow_primary ">
          <span className="text-lg font-bold">Email *</span>
          <TextField id="outlined-basic" variant="outlined" ></TextField>
        </div>
      </div>
      <div><Button variant="contained" className="bg-[#DF6A6A] mt-[20px] rounded-[15px] px-8 py-4 font-bold text-xl shadow-shadow_primary ">Gửi đi</Button></div>
    </div>
  );
};

export default Product_form;
