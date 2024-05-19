import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Admin from "../../assets/admin_icon.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ResponseBody {
  full_name: string;
  eRole: string;
}
const AdminHorizontal = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<ResponseBody>({
    full_name: "",
    eRole: "",
  });

  const handleNav = () => {
    navigate("/login")
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
  }

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
  return (
    <div className="w-full shadow-shadow_primary flex flex-row items-center gap-[10px] p-4 justify-end">
      <div className="w-[30px] h-[30px]">
        <NotificationsNoneIcon className="w-full h-full object-cover text-[#A2A3A6]"></NotificationsNoneIcon>
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
      <div onClick={handleNav}><span className="text-xl">Log out</span></div>
    </div>
  );
};

export default AdminHorizontal;
