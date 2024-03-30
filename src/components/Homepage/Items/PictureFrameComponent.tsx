import React from "react";
import Img_Frame from "../../../assets/pic_frame.png";
import { Link } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
const PictureFrameComponent = () => {
  return (
    <div>
      <div className="relative">
    <div className=" w-full h-[300px] rounded-[20px]">
        <img src={Img_Frame} className="w-full h-full object-cover rounded-[15px]" alt="frame_img"></img>
    </div>
      <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] flex flex-col w-8/10 text-center">
        <h1 className="text-xl text-white font-bold">Khung tranh màu nâu bề mặt phẳng mịn đơn giản và đẹp</h1>
        <div className="bg-red-500 p-[15px] mx-auto my-8 flex flex-row items-center justfy-center">
          <MailIcon className="text-white mr-[5px]"></MailIcon>
          <Link to="/contact" className="text-white font-bold">LIÊN HỆ</Link>
          </div>
        <h1 className="bg-[#DDDDDD] w-8/10 mx-auto p-[10px] rounded-[15px] font-bold font-[#787171]">Xem nhanh</h1>
      </div>
    </div>
    </div>
  );
};

export default PictureFrameComponent;
