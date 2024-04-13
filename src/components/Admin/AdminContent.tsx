import React, { useEffect } from "react";
import { Customer } from "../../interface/IUSerInfo";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AdminContent = () => {
  const [customerInfo, setCustomerInfo] = useState<Customer[]>([
  ]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'full_name', headerName: 'Họ và tên', width: 250},
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone_number', headerName: 'Số điện thoại', width: 200 },
    { field: 'address', headerName: 'Địa chỉ', width: 300 },
    { field: 'gender', headerName: 'Giới tính', width: 100 },
  ];
  
  useEffect(() => {
    const customerList = async () => {
      try {
        const response = await fetch("http://localhost:8686/admin/users");
        const data = await response.json();
        if (response.ok) {
          setCustomerInfo(data);
          console.log(customerInfo);
        } else {
            setEmptyMessage(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    customerList();
  }, []);
  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">Quản lý khách hàng</h1>
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
              <Button variant="contained" className="bg-[#899BE0]">
                <div className="flex items-center gap-[10px]">
                  <GroupAddIcon></GroupAddIcon>
                  <span>Thêm khách hàng</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
      {customerInfo.length > 0 ? (
          <DataGrid
            rows={customerInfo}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 14]}
          />
        ) : (
          <div className="text-center py-4">
            <h1 className="text-2xl text-red-500">{emptyMessage}</h1>
          </div>
        )}
    </div>
    </div>
  );
};

export default AdminContent;
