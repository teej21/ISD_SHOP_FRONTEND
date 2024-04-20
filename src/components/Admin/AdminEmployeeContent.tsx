import React, { useContext, useEffect } from "react";
import { Customer } from "../../interface/IUSerInfo";
import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../context/AdminController.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const AdminEmployeeContent = () => {
  const [customerInfo, setCustomerInfo] = useState<Customer[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const navHeader = useContext(ClickAdmin);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "full_name", headerName: "Họ và tên", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone_number", headerName: "Số điện thoại", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 200 },
    { field: "date_of_birth", headerName: "Ngày sinh", width: 150 },
    { field: "role", headerName: "Chức vụ", width: 200 },
    { field: "gender", headerName: "Giới tính", width: 100 }, 
    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row gap-[40px]">
          <div
            onClick={(event) => {
              event.stopPropagation();
              handleEditClick(params);
            }}
          >
            <EditIcon className="text-blue-500" />
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick(params);
            }}
          >
            <DeleteIcon className="text-red-500" />
          </div>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const roles = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
        const fetchPromises = roles.map(role =>
          fetch(`http://localhost:8686/admin/users/role=${role}`)
        );

        const responses = await Promise.all(fetchPromises);
        const data = await Promise.all(responses.map(response => response.json()));
        const combinedData = data.reduce((acc, curr) => acc.concat(curr), []);
        setCustomerInfo(combinedData);
      } catch (error) {
        console.log(error);
        setEmptyMessage('Error fetching data');
      }
    };

    fetchCustomerList();
 }, []);

  const handleRowClick = (params: any) => {
    const customerId = params.row.id;
    navigate(`/admin/users/${customerId}`);
    navHeader.handleSetMode("customer-detail");
  };

  const handleEditClick = (params: any) => {
    const customerId = params.row.id;
    navigate(`/admin/users/${customerId}/modify_employee`);
  };

  const handleDeleteClick = async (params: any) => {
    const customerId = params.row.id;
    
    const response = await fetch(
      `http://localhost:8686/admin/users/${customerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setCustomerInfo(data => data.filter((customer) => customer.id !== customerId));
    }}


  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">Quản lý nhân viên</h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="rounded-[50px] border-[E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
              />
              <div className="absolute right-3 top-3">
                <SearchIcon className="text-[#A2A3A6]" />
              </div>
            </div>
            <div>
              <Button variant="contained" className="bg-[#899BE0]">
                <div className="flex items-center gap-[10px]" onClick={() => navigate('/admin/users/add_employees')}>
                  <GroupAddIcon />
                  <span>Thêm nhân viên</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {customerInfo ? (
         <DataGrid
         rows={customerInfo}
         columns={columns}
         onRowClick={handleRowClick}
         paginationModel={paginationModel}
         onPaginationModelChange={(model) => setPaginationModel(model)}
         pageSizeOptions={[10]} 
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

export default AdminEmployeeContent;
