import React from "react";
import Img_Frame from "../../../assets/pic_frame.png";
import { Link } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteIcon from "@mui/icons-material/Favorite";
const PictureFrameComponent = () => {
  return (
    <div>
      <div className="relative">
        <div className="relative w-full h-[300px] rounded-[20px]">
          <img
            src={Img_Frame}
            className="w-full h-full object-cover rounded-[15px] hover:scale-105 transition duration-300"
            alt="frame_img"
          />
          <div className="rounded-full block absolute top-4 right-4 text-white hover:text-red-500 cursor transition duration-300">
            <FavoriteIcon />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] flex flex-col w-8/10 text-center">
          <h1 className="text-xl text-white font-bold">
            Khung tranh màu nâu bề mặt phẳng mịn đơn giản và đẹp
          </h1>
          <div className="bg-red-500 p-[10px] mx-auto my-8 flex flex-row items-center justfy-center hover:bg-orange-500 transition duration-300 ">
            <MailIcon className="text-white mr-[5px]"></MailIcon>
            <Link to="/contact" className="text-white font-bold">
              LIÊN HỆ
            </Link>
          </div>
          <h1 className="bg-[#DDDDDD] w-8/10 mx-auto p-[10px] rounded-[15px] font-bold font-[#787171] hover:bg-gray-300 hover:shadow-shadow_primary transition duration-300">
            Xem nhanh
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PictureFrameComponent;
