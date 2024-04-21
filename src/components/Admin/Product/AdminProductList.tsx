import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../../interface/IProduct.ts";
const AdminProductList = () => {
  const [productInfo, setProductInfo] = useState<Product[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [searchResult, setSearchResult] = useState<string>('');
  const navHeader = useContext(ClickAdmin);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "thumbnail", headerName: "", width: 200 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "price", headerName: "Giá tiền", width: 200 },
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
    const fetchImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8686/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProductInfo(data);
        } else {
          const errorData = await response.json();
          setEmptyMessage(errorData.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage();
  }, []);


  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8686/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProductInfo(data);
        } else {
          const errorData = await response.json();
          setEmptyMessage(errorData.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductList();
  }, []);

  const handleSearch = (e: any) => {
    setSearchResult(e.target.value);
  }
  const handleRowClick = (params: any) => {
    const productId = params.row.id;
    console.log(productId);
    navigate(`/admin/products/${productId}`);
  };

  const handleEditClick = (params: any) => {
    const productId = params.row.id;
    navigate(`/admin/products/${productId}/modify_product`);
  };

  const handleDeleteClick = async (params: any) => {
    const productId = params.row.id;
    
    const response = await fetch(
      `http://localhost:8686/categories/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/formData",
        },
      }
    );
    const deletedData = await response.json();
    if (response.ok) {
      setSuccessMessage(deletedData.result);
      setProductInfo(data => data.filter((product) => product.id !== productId));
    }

  };
  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">Quản lý hàng hóa</h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="rounded-[50px] border-[E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
              />
              <div className="absolute right-3 top-3" onChange={handleSearch}>
                <SearchIcon className="text-[#A2A3A6]" />
              </div>
            </div>
            <Button
              variant="contained"
              className="bg-[#899BE0]"
              onClick={() => navigate("/admin/products/add_product")}
            >
              <div className="flex items-center gap-[10px]">
                <GroupAddIcon />
                <span>Thêm Hàng Hóa</span>
              </div>
            </Button>
          </div>
        </div>
        {productInfo ? (
          <div>
            <DataGrid
              rows={productInfo.filter((product) => product.name.toLowerCase().includes(searchResult.toLowerCase()))}
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

export default AdminProductList;
