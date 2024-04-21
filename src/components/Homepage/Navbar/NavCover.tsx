import React from "react";
import { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { ResponseBody } from "../../../interface/IUSerInfo";

const NavCover = () => {
  const [isActive, setIsActive] = useState<ResponseBody | null>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token")
      const full_name = localStorage.getItem("full_name");
      console.log("access_token", token);
      if (role && token && refreshToken && full_name) {
        setIsActive({
          fullName: full_name,
          tokens: {
            access_token: "",
            refresh_token: "",
          },
          role: role,
        });
        console.log("fullName", role);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("role");
    setIsActive(null);
  };
  return (
    <div>
      <div className="bg-[#D36B97] flex justify-end items-center gap-[10px] py-2 md:px-16 px-2 w-full">
        <div className="md:block hidden">
          <ul className="flex flex-row justify-center gap-[15px] items-center">
            <li className="text-white">Trang chủ</li>
            <li className="text-white">Giới thiệu</li>
            <li className="text-white">Liên hệ</li>
            <li className="text-white">Bản đồ đến shop</li>
            <li className="text-white">Tuyển dụng</li>
            <li className="text-white">
              {isActive?.fullName ? (
                <div className="flex flex-row gap-[10px]">
                  Xin chào<span>{isActive.fullName}</span>
                  <span onClick={handleLogout}>Đăng xuất</span>
                </div>
              ) : (
                <div className="flex flex-row gap-[10px]">
                  <h1>{isActive?.fullName}</h1>
                  <Link to="/login">Đăng nhập</Link>
                  <Link to="/sign_up">Đăng ký</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="md:text-white md:block hidden">
          <FacebookIcon />
          <TwitterIcon />
          <MailIcon />
        </div>
      </div>
    </div>
  );
};

export default NavCover;
