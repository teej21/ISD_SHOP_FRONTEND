import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Customer } from "../../interface/IUSerInfo";
import AdminNavigation from "./AdminNavigation.tsx";
import { ClickAdmin } from "../../context/AdminController.tsx";
import { useNavigate } from 'react-router-dom';
import AdminModify from "./AdminModify.tsx";
import useAccessToken from "../../composables/getAccessToken.ts";
import AdminHorizontal from "./AdminHorizontal.tsx";
const AdminPageDetail = () => {
  const [customerDetail, setCustomerDetail] = useState<Customer | null>(null);
  const [emptyMessage, setEmptyMessage] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const access_token = useAccessToken();
   useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8686/admin/users/${id}`, {
          method: 'GET',
          headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${access_token}`}
        });
        const data = await response.json();
        if (response.ok) {
          setCustomerDetail(data);
        } else {
          setEmptyMessage(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerDetails()
  }, [access_token]);

  if (!customerDetail) {
    return <p>Loading...</p>;
  }
  return (
    <div> <AdminHorizontal/>
    <div className="absolute top-[55%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">
              Thông tin chi tiết
            </h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div>
              <Button variant="contained" className="bg-[#899BE0]" onClick={() => {nav.handleSetMode("customer") 
              navigate('/admin')}}>
                <div className="flex items-center gap-[10px]">
                  <GroupAddIcon></GroupAddIcon>
                  <span>Trở về</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-[50px] gap-4 px-8 py-4 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-between w-full">
          <DetailRow label="Họ và tên" value={customerDetail.full_name} />
          <DetailRow
            label="Số điện thoại"
            value={customerDetail.phone_number}
          />
          <DetailRow label="Địa chỉ" value={customerDetail.address} />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row justify-between items-center">
            <DetailRow label="ID" value={customerDetail.id} />
            <DetailRow label="Chức vụ" value={customerDetail.role} />
            <DetailRow label="Giới tính" value={customerDetail.gender} />
          </div>
          <DetailRow label="Email" value={customerDetail.email} />
          <DetailRow label="Ngày sinh" value={customerDetail.date_of_birth} />
        </div>
      </div>
    </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="font-bold text-2xl">{label} *</h1>
      {value ? <div className="bg-white p-2 border-2 border-solid border-black w-full">
        <span className="text-xl">{value}</span>
      </div> : <div className="bg-white p-2 border-2 border-solid border-black w-full">
        <span className="text-xl">No information</span>
      </div>}
    </div>
  );
};

export default AdminPageDetail;
