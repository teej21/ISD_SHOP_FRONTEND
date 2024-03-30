import React from "react";
import User_Icon from "../../../assets/user_icon.png";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
const Feedback = () => {
  return (
    <div>
      <div className="mx-auto my-[50px] text-center">
        <span className="text-[#555868] p-2 text-3xl font-bold">
          Đánh Giá Từ Khách Hàng
        </span>
      </div>

      <div className="grid grid-cols-gridFlexible2 w-8/10 gap-[20px] mx-auto">
        <div className="flex flex-row justify-between items-center gap-[20px] bg-transparent rounded-[10px] border-2 border-solid border-gray-300 px-4 py-2">
          <div className="w-[70px] h-[70px]">
            <img
              src={User_Icon}
              alt="icon_user"
              className="w-full h-full object-fit"
            ></img>
          </div>
          <div className="flex flex-col justify-center w-8/10">
            <div className="text-yellow-500">
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
            </div>
            <div className="text-[#BFBFBF] italic text-base text-justify">
              Tôi đã mua 3 bức tranh nghệ thuật từ AnNhien.com... Chất lượng
              tranh là rất tốt theo quan điểm của tôi, những bức tranh rất xứng
              đáng có một vị trí trong bộ sưu tập của tôi.
            </div>
            <div className="text-[#828282] text-lg font-bold">Minh Thuận</div>
          </div>
        </div>

          <div className="flex flex-row justify-between items-center gap-[20px] bg-transparent rounded-[10px] border-2 border-solid border-gray-300  px-4 py-2">
            <div className="w-[70px] h-[70px]">
              <img
                src={User_Icon}
                alt="icon_user"
                className="w-full h-full object-fit"
              ></img>
            </div>
            <div className="flex flex-col justify-center w-8/10">
              <div className="text-yellow-500">
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
              </div>
              <div className="text-[#BFBFBF] italic text-base text-justify">
                Tôi đã mua 3 bức tranh nghệ thuật từ AnNhien.com... Chất lượng
                tranh là rất tốt theo quan điểm của tôi, những bức tranh rất
                xứng đáng có một vị trí trong bộ sưu tập của tôi.
              </div>
              <div className="text-[#828282] text-lg font-bold">Minh Thuận</div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-[20px] bg-transparent rounded-[10px] border-2 border-solid border-gray-300 px-4 py-2 md:mb-0 mb-[50px]">
            <div className="w-[70px] h-[70px]">
              <img
                src={User_Icon}
                alt="icon_user"
                className="w-full h-full object-fit"
              ></img>
            </div>
            <div className="flex flex-col justify-center w-8/10">
              <div className="text-yellow-500">
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
              </div>
              <div className="text-[#BFBFBF] italic text-base  text-justify">
                Tôi đã mua 3 bức tranh nghệ thuật từ AnNhien.com... Chất lượng
                tranh là rất tốt theo quan điểm của tôi, những bức tranh rất
                xứng đáng có một vị trí trong bộ sưu tập của tôi.
              </div>
              <div className="text-[#828282] text-lg font-bold">Minh Thuận</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Feedback;
