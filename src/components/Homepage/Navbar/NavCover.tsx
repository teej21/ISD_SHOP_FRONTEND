import React, { useContext } from "react";
import { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import { ResponseBody } from "../../../interface/IUSerInfo";
import { useRef } from "react";
import { ClickBarContext } from "../../../context/ClickForHomepage.tsx";
const NavCover = () => {
  const [isActive, setIsActive] = useState<ResponseBody | null>();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const click = useContext(ClickBarContext);
  const introductionRef = click.introductionRef;

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  const handleNavigation = () => {
    navigate("/");
  };
  useEffect(() => {
    if (activeItem === "introduction" || activeItem === "products") {
      introductionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(null);
  }, [activeItem]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      const full_name = localStorage.getItem("full_name");
      const user_id = localStorage.getItem("user_id");
      console.log("access_token", token);
      if (role && token && refreshToken && full_name) {
        setIsActive({
          full_name: full_name,
          user_id: user_id,
          tokens: {
            access_token: "",
            refresh_token: "",
          },
          role: role,
        });
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setIsActive(null);
    handleNavigation();
  };
  return (
    <div>
      <div className="bg-[#D36B97] flex justify-end items-center gap-[10px] py-2 md:px-16 px-2 w-full">
        <div className="md:block hidden">
          <ul className="flex flex-row justify-center gap-[15px] items-center">
            <Link to="/">
              <li className="text-white">Trang chủ</li>
            </Link>
            <li
              className="text-white"
              onClick={() => handleClick("introduction")}
            >
              Giới thiệu
            </li>
            <li className="text-white" onClick={() => handleClick("products")}>
              Tranh nổi bật
            </li>
            <li className="text-white">
              {isActive?.full_name ? (
                <div className="flex flex-row gap-[10px]">
                  Xin chào<span>{isActive.full_name}</span>
                  <span onClick={handleLogout}>Đăng xuất</span>
                </div>
              ) : (
                <div className="flex flex-row gap-[10px]">
                  <h1>{isActive?.full_name}</h1>
                  <Link to="/login">Đăng nhập</Link>
                  <Link to="/sign_up">Đăng ký</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavCover;
