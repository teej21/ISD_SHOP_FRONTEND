import React, { useContext } from "react";
import V from "../../../assets/v-mark.gif";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Overlay from "./Overlay.tsx";
import { ThemeContext } from "../../../context/ClickTheme.tsx";
const SuccessfulMessage = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    theme.handleClickSignUp();
    console.log(theme.handleClickSignUp);
    navigate("/login");
  };
  return (
    <div>
      {theme.clickSignUp && (
        <Overlay>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] bg-white shadow-shadow_primary p-12 flex flex-col gap-[10px]">
            <h1 className="font-bold md:text-xl text-lg text-center">
              ĐĂNG KÍ THÀNH CÔNG!
            </h1>
            <div className="w-[200px] h-[200px] mx-auto my-8">
              <img src={V} alt="img" className="w-full h-full object-fit"></img>
            </div>
            <Button
              variant="contained"
              type="submit"
              className="mx-auto my-8"
              style={{ backgroundColor: "#9A917A" }}
              onClick={handleNavigate}
            >
              Đăng nhập
            </Button>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default SuccessfulMessage;
