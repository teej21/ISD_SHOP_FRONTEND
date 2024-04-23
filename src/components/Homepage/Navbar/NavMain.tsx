import React, { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';
import { ClickBarContext } from "../../../context/ClickForHomepage.tsx";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const NavMain = () => {
  const clickBar = useContext(ClickBarContext);

  return (
    <>
      <div className={`${clickBar.barClick ? "fixed inset-0 bg-black bg-opacity-50 z-10 flex" : ""}`}>
        <div className={` md:bg-[#6C5070] bg-white shadow-shadow_primary md:w-full md:w-full w-[260px] relative ${clickBar.barClick ? "" : "md:block hidden"}`}>
          <ul className="box-border 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-[20px] md:grid md:grid-cols-smallGrid md:justify-center md:items-center flex flex-col gap-x-[40px] gap-y-[30px] md:w-full ">
            <li className="flex flex-row hover:bg-[#DF6A6A] md:p-4 md:gap-[5px]  " >
              <div className="md:text-white md:flex md:justify-between md:items-center md:font-bold md:block hidden">
                <MenuIcon className="md:hidden block" onClick={clickBar.handleBarClick}></MenuIcon>
                <span className="md:text-sm">DANH MỤC SẢN PHẨM</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4">
              <div className="md:text-white md:flex md:justify-between md:gap-[5px] md:items-center text-[#666666D9] font-bold">
                <span className="text-sm">TRANH SƠN DẦU</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4 md:gap-[5px] ">
              <div className="md:text-white md:flex md:justify-between md:items-center text-[#666666D9] font-bold">
                <span className="text-sm">TRANH PHONG CẢNH</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4 md:gap-[5px] ">
              <div className="md:text-white md:flex md:justify-between md:items-center text-[#666666D9] font-bold">
                <span className="text-sm">TRANH NGHỆ THUẬT</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4 md:gap-[5px] ">
              <div className="md:text-white md:flex md:justify-between md:items-center text-[#666666D9] font-bold ">
                <span className="text-sm">TRANH TRỪU TƯỢNG</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4 md:gap-[5px] ">
              <div className="md:text-white md:flex md:justify-between md:items-center text-[#666666D9] font-bold">
                <span className="text-sm">TRANH SƠN MÀI</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4 md:gap-[5px] ">
              <div className="md:text-white md:flex md:justify-between  md:items-center text-[#666666D9] font-bold">
                <span className="text-sm">KHUNG TRANH</span>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            {clickBar.barClick  && <><li className="flex flex-row gap-[5px] items-center p-4 hover:bg-[#DF6A6A] ">
              <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                <Link to="/login" >ĐĂNG NHẬP</Link>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center p-4 hover:bg-[#DF6A6A]">
              <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                <Link to="/sign_up" >ĐĂNG KÍ</Link>
                <ExpandMoreIcon></ExpandMoreIcon>
              </div>
            </li>
            <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-4">
              <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                <FacebookIcon />
                <TwitterIcon />
                <MailIcon />
              </div>
            </li></>}
          </ul>
          <div className="md:hidden block"><CloseIcon className="absolute top-2 right-2 " onClick={clickBar.handleBarClick}></CloseIcon></div>
        </div>
      </div>
    </>
  );
};

export default NavMain;
