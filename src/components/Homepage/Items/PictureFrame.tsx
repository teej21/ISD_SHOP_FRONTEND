import React from "react";
import PictureFrameComponent from "./PictureFrameComponent.tsx";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const PictureFrame = () => {
  const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div>
      <div className="my-[50px] text-center">
        <span className="text-[#555868] p-2 text-3xl font-bold">
        Khung Tranh Đẹp - Giá Tốt Nhất
        </span>
      </div>
      <div className="grid md:grid-cols-[repeat(2,minmax(200px,1fr))] grid-cols-gridFlexible2 max-w-[1200px] lg:w-full w-8/10 mx-auto my-8 gap-[20px]">
        {gridItems.map((index, productID) => {
          return <PictureFrameComponent key={productID} />;
        })}
      </div>
      <div className="mx-auto my-8 bg-red-500 relative w-[300px] p-2 rounded-[15px] flex gap-[15px] ">
        <AddIcon className="text-white font-bold"/>
        <Link to="/" className="text-white font-bold flex">Xem Thêm Khung Tranh Khác</Link>
      </div>
    </div>
  );
};

export default PictureFrame;
