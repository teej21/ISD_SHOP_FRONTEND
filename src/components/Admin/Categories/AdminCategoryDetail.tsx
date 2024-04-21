import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavigation from ".././AdminNavigation.tsx";
import { useNavigate } from 'react-router-dom';
import { ClickAdmin } from "../../../context/AdminController.tsx";
import { ICategories } from "../../../interface/ICategory.ts";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
const AdminCategoryDetail = () => {
  const [categoryDetail, setCategoryDetail] = useState<ICategories | null>(null);
  const [emptyMessage, setEmptyMessage] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleNav = useContext(ClickAdmin);
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8686/categories/${id}`);
        const data = await response.json();
        if (response.ok) {
          setCategoryDetail(data);
          console.log(categoryDetail);
        } else {
          setEmptyMessage(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerDetails();
  }, [id]);

  if (!categoryDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div> <AdminNavigation/>
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">
              Thông tin chi tiết
            </h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="rounded-[50px] border-[E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
              />
              <div className="absolute right-3 top-3">
                <SearchIcon className="text-[#A2A3A6]"></SearchIcon>
              </div>
            </div>
            <div>
              <Button variant="contained" className="bg-[#899BE0]" onClick={() => navigate('/admin')}>
                <div className="flex items-center gap-[10px]">
                <KeyboardReturn></KeyboardReturn>
                  <span>Trở về</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-[10px] gap-4 px-8 py-4 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row justify-between w-full">
          <DetailRow label="Tên danh mục" value={categoryDetail.name} />
          <DetailRow label="ID" value={categoryDetail.id} />
        </div>
        <div className="w-full">
          <DetailRow label="Mô tả" value={categoryDetail.description} />
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

export default AdminCategoryDetail;
