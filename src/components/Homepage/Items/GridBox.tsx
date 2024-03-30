import React from "react";
import Picture_1 from '../../../assets/pic_1.png'
const GridBox = () => {
  return (
    <div className="flex flex-col items-center border-2 border-[#000000] border-solid rounded-[10px]">
      <div className="w-full h-8/10 flex flex-col gap-[10px]">
        <img src={Picture_1} className="w-full h-8/10 object-cover rounded-[10px]"></img>
        <h1 className="font-bold text-lg text-center">TRANH SƠN DẦU</h1>
      </div>
      <div>
      <span className="text-[#AEA093] italic">100 sản phẩm</span>
      </div>
    </div>
  );
};

export default GridBox;
