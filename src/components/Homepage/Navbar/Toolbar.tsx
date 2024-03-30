import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { ClickBarContext } from "../../../context/ClickForHomepage.tsx";
const ToolBar = () => {
  const clickBar = useContext(ClickBarContext);
  return (
    <div className="bg-white md:flex md:flex-row md:justify-evenly md:items-center md:gap-[20px] md:my-[30px] max-w-[1500px] mx-auto md:shadow-none md:border-none md:w-full lg:px-8 shadow-shadow_primary border-2 border-solid w-8/10 p-4 z-10">
      <div className="md:block flex flex-row justify-between items-center ">
        <div className="md:hidden block">
          <MenuIcon onClick={clickBar.handleBarClick}></MenuIcon>
        </div>
        <span className="font-beau text-red-500 xl:text-5xl text-4xl font-bold">
          <span className="text-[#89A8A4] xl:text-5xl text-4xl font-aladin">
            AN
          </span>
          NHIÊN
        </span>
        <div className="md:hidden block">
          <ShoppingCartIcon></ShoppingCartIcon>
        </div>
      </div>
      <div className="md:flex md:lex-row md:relative md:w-1/2 relative p-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="bg-[#F7F7F7] p-3 rounded-[20px] w-full h-full border-[E2E2E2] border-2 border-solid"
        ></input>
        <div className="absolute right-6 top-6">
          <SearchIcon className="text-[#7D7D7D]" />
        </div>
      </div>
      <div className="md:flex lg:flex-row flex-col md:gap-[10px] md:items-center md:block hidden">
        <div className="flex items-center">
          <span className="font-bold xl:text-lg text-sm text-[#7D7D7D] mr-1">
            YÊU THÍCH
          </span>
          <FavoriteIcon className="xl:w-[25px] xl:h-[25px] w-[20px] height-[20px]" />
        </div>
        <div className="flex gap-[5px] items-center">
          <span className="font-bold xl:text-lg text-sm text-[#7D7D7D] mr-1">
            GIỎ HÀNG
          </span>
          <ShoppingCartIcon className="text-[#7D7D7D] xl:w-[25px] xl:h-[25px] w-[20px] height-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
