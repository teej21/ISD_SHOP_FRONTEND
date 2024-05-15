import React, { useContext, useEffect } from "react";
import { ICategories } from "../../../interface/ICategory.ts";
import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAccessToken from "../../../composables/getAccessToken.ts";
import SuccessMessage from "../../LoadingFrame/SuccessMessage.ts";
const AdminContent = () => {
  const [customerInfo, setCustomerInfo] = useState<ICategories[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [searchResult, setSearchResult] = useState('');
  const navHeader = useContext(ClickAdmin);
  const role = localStorage.getItem("role");
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Tên Danh Mục", width: 400 },
    { field: "description", headerName: "Mô Tả", width: 600 },
    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row gap-[40px]">
        {role === 'ADMIN' && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              handleEditClick(params);
            }}
          >
            <EditIcon className="text-blue-500" />
          </div>
        )}
        {role === 'ADMIN' && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              const userConfirmed = window.confirm("Bạn có muốn xóa bảng này?");
              if (userConfirmed) {
                  handleDeleteClick(params);
              }
            }}
          >
            <DeleteIcon className="text-red-500" />
          </div>
        )}
      </div>
      ),
    },
  ];

  const navigate = useNavigate();
   const access_token = useAccessToken();
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8686/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access_token}`
            },
          }
        );
        if (response.ok) {
          const data : ICategories[] = await response.json();
          setCustomerInfo(data);
        } else {
          const errorData = await response.json();
          setEmptyMessage(errorData.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerList();
  }, []);

  const handleSearch = (e: any) => {
    setSearchResult(e.target.value);
  };

  const handleRowClick = (params: any) => {
    const categoryId = params.row.id;
    console.log(categoryId);
    navigate(`/admin/categories/${categoryId}`);
    navHeader.handleSetMode("customer-detail");
  };

  const handleEditClick = (params: any) => {
    const categoryId = params.row.id;
    navigate(`/admin/categories/${categoryId}/modify_category`);
  };

  const handleDeleteClick = async (params: any) => {
    const categoryId = params.row.id;
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(
      `http://localhost:8686/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        signal: signal
      }
    );
    const deletedData = await response.json();
    if (response.ok) {
        SuccessMessage(deletedData.result);
        setCustomerInfo((data) =>
          data.filter((category) => category.id !== categoryId)
        );
      }
  };
  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">Quản lý danh mục</h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="rounded-[50px] border-[E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
                value={searchResult}
                onChange={handleSearch}
              />
              <div className="absolute right-3 top-3">
                <SearchIcon className="text-[#A2A3A6]" />
              </div>
            </div>
            <Button
              variant="contained"
              className="bg-[#899BE0]"
              onClick={() => navigate("/admin/categories/add_category")}
              disabled={role !== 'ADMIN'}
            >
              <div className="flex items-center gap-[10px]">
                <GroupAddIcon />
                <span>Thêm Danh Mục</span>
              </div>
            </Button>
          </div>
        </div>
        {successMessage && (
          <h1 className="text-green-500 text-xl font-bold ml-[20px]">
            {successMessage}
          </h1>
        )}
     {customerInfo ? (
          <div>
            <DataGrid
           rows={customerInfo.filter((category) => category.name.toLowerCase().includes(searchResult.toLowerCase()))}
              columns={columns}
              onRowClick={handleRowClick}
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              pageSizeOptions={[10]}
            />
          </div>
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
