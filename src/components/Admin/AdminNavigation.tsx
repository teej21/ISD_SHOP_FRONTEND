import React, { useContext, useEffect } from "react";
import { useState } from "react";
import WindowIcon from "@mui/icons-material/Window";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupIcon from "@mui/icons-material/Group";
import MoneyBag from "../../assets/money_bag.png";
import Box from "../../assets/box.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Admin from "../../assets/admin_icon.png";
import { ClickAdmin } from "../../context/AdminController.tsx";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/AddToCartContext.tsx";
interface ResponseBody {
  full_name: string;
  eRole: string;
}
const AdminNavigation = () => {
  const [clickExpand, setClickPlan] = useState(false);
  const navigatePage = useContext(ClickAdmin);
  const cartContext = useContext(CartContext);
  const [hover, setHover] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<ResponseBody>({
    full_name: "",
    eRole: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getEmployeeInfor = () => {
      const fullName = localStorage.getItem("full_name");
      const role = localStorage.getItem("role");
      if (fullName && role) {
        setEmployeeData({
          full_name: fullName,
          eRole: role,
        });
      }
    };
    getEmployeeInfor();
  }, []);

  const handleExpand = () => {
    setClickPlan((state) => !state);
  };
  const handleClickCustomer = () => {
    navigatePage.handleSetMode("customer");
  };
  const handleNav = () => {
    navigate("/login")
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
  }
  // const handleClick = () => {
  //   cartContext.handleSuccess(11);
  //   setHover(false);
  // }
  return (
    <div className="flex flex-row justify-between items-start">
      <div className=" flex flex-col gap-20 shadow-shadow_primary w-[20%] p-8 h-screen">
        <div>
          <span className="font-beau text-red-500 text-4xl font-bold mr-[5px]">
            <span className="text-[#89A8A4] text-4xl font-aladin">AN</span>NHIÊN
          </span>
        </div>
        <div className="flex flex-col justify-center gap-[10px]">
          <div>
            <h1 className="text-[#B8B8B8] text-xl ml-[10px]">MAIN MENU</h1>
          </div>
          <div>
            <ul className="flex flex-col gap-[10px]">
              <li className="text-[#B8B8B8] text-lg">
                <div className="flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px]">
                  <WindowIcon></WindowIcon>
                  <span className="text-lg text-[#6E6E6E]">
                    Trang Tổng quan
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={handleClickCustomer}
                  className={
                    navigatePage.mode === "customer"
                      ? "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 rounded-[10px] cursor-pointer bg-[#DBDCDE] "
                      : "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px] cursor-pointer"
                  }
                >
                  <GroupIcon className="text-blue-900"></GroupIcon>
                  <span className="text-[#6E6E6E] text-lg">
                    Quản Lý Khách Hàng
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigatePage.handleSetMode("employee")}
                  className={
                    navigatePage.mode === "employee"
                      ? "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 rounded-[10px] cursor-pointer bg-[#DBDCDE] "
                      : "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px] cursor-pointer"
                  }
                >
                  <BusinessCenterIcon className="text-blue-900"></BusinessCenterIcon>
                  <span className="text-[#6E6E6E] text-lg">
                    Quản Lý Nhân Viên
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigatePage.handleSetMode("bills")}
                  className={
                    navigatePage.mode === "bills"
                      ? "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 rounded-[10px] cursor-pointer bg-[#DBDCDE] "
                      : "flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px] cursor-pointer"
                  }
                >
                  <img
                    src={MoneyBag}
                    alt="icon"
                    className="w-[20px] h-[20px]"
                  />
                  <span className="text-[#6E6E6E] text-lg">Đơn hàng</span>
                </div>
              </li>
              <li className="mt-[10px]">
                <div
                  className="flex flex-row justify-between items-center hover:bg-[#DBDCDE] p-2 hover:rounded-[10px]"
                  onClick={handleExpand}
                >
                  <div className="flex flex-row items-center gap-[5px]">
                    <img src={Box} alt="icon" className="w-[20px] h-[20px]" />
                    <span className="text-[#6E6E6E] text-lg">
                      Quản Lý Hàng Hóa
                    </span>
                  </div>
                  {clickExpand ? (
                    <ExpandLessIcon className="text-blue-500"></ExpandLessIcon>
                  ) : (
                    <ExpandMoreIcon className="text-blue-500"></ExpandMoreIcon>
                  )}
                </div>
                {clickExpand && (
                  <ul className="flex flex-col ml-6 mt-[10px] gap-[10px]">
                    <li
                      key="danh-muc"
                      onClick={() => navigatePage.handleSetMode("lists")}
                      className={
                        navigatePage.mode === "lists"
                          ? "text-[#6E6E6E] text-lg bg-[#DBDCDE] rounded-[10px]"
                          : "text-[#6E6E6E] text-lg"
                      }
                    >
                      <div className="flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px]">
                        <img
                          src={Box}
                          alt="icon"
                          className="w-[20px] h-[20px]"
                        />
                        Danh mục
                      </div>
                    </li>
                    <li
                      onClick={() => navigatePage.handleSetMode("products")}
                      key="hang-hoa"
                      className={
                        navigatePage.mode === "products"
                          ? "text-[#6E6E6E] text-lg bg-[#DBDCDE] rounded-[10px]"
                          : "text-[#6E6E6E] text-lg"
                      }
                    >
                      <div className="flex flex-row items-center gap-[5px] hover:bg-[#DBDCDE] p-2 hover:rounded-[10px]">
                        <img
                          src={Box}
                          alt="icon"
                          className="w-[20px] h-[20px]"
                        />
                        Hàng hóa
                      </div>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full shadow-shadow_primary flex flex-row items-center gap-[10px] p-4 justify-end">
        <div className="w-[30px] h-[30px] relative">
          <NotificationsNoneIcon className="w-full h-full object-cover text-[#A2A3A6]" ></NotificationsNoneIcon>
          {cartContext.isSuccess && <div className="w-[15px] h-[15px] bg-orange-500 rounded-full absolute top-0 right-0 z-10"></div>}
          {hover && <div>Có đơn hàng mới!</div>}
        </div>
        <div className="w-[50px] h-[50px]">
          <div>
            <img
              src={Admin}
              alt="admin"
              className="w-full h-full object-cover"
            ></img>
          </div>
        </div>
        <div className="flex flex-col text-xl">
          <span>
            Chào mừng, <span>{employeeData.full_name}</span>
          </span>
          <span>{employeeData.eRole}</span>
        </div>
        <div><span className="text-2xl hover:font-bold" onClick={handleNav}>Log out</span></div>
      </div>
    </div>
  );
};

export default AdminNavigation;
