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
import { ICategories } from "../../../interface/ICategory.ts";
import useAccessToken from "../../../composables/getAccessToken.ts";
import SystemSuccessMessage from "../../Login/login/SystemSuccessMessage.tsx";

const AdminProductList = () => {
  const [productInfo, setProductInfo] = useState<Product[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [searchResult, setSearchResult] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const flattenedProducts = productInfo.map((product) => ({
    ...product,
    categoryName: product.category.name,
  }));
  const role = localStorage.getItem("role");
  const access_token = useAccessToken();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "thumbnail", headerName: "Ảnh minh họa", width: 200 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "description", headerName: "Miêu tả", width: 200 },
    { field: "material", headerName: "Chất liệu", width: 200 },
    { field: `categoryName`, headerName: "Tên tranh", width: 200 },
    { field: "price", headerName: "Giá tiền", width: 200 },
    { field: "width", headerName: "Chiều rộng", width: 200 },
    { field: "height", headerName: "Chiều dài", width: 200 },
    { field: "status", headerName: "Trạng thái", width: 200 },
    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row gap-[40px]">
          {role === "ADMIN" && (
            <div
              onClick={(event) => {
                event.stopPropagation();
                handleEditClick(params);
              }}
            >
              <EditIcon className="text-blue-500" />
            </div>
          )}
          {role === "ADMIN" && (
            <div
              onClick={(event) => {
                event.stopPropagation();
                const userConfirmed = window.confirm(
                  "Bạn có muốn xóa bảng này?"
                );
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:8686/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProductInfo(data);
          console.log(data);
        } else {
          const errorData = await response.json();
          setEmptyMessage(errorData.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await fetch("http://localhost:8686/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.ok) {
          const data: ICategories[] = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerList();
  }, []);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await fetch("http://localhost:8686/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.ok) {
          const data: Product[] = await response.json();
          setProductInfo(data);
          console.log(data);
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
  };
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
    const param = params.row.id;
    try {
      const response = await fetch(`http://localhost:8686/products/${param}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.ok) {
        const data: Product[] = await response.json();
        setProductInfo(data);
        setSuccessMessage("Xóa sản phẩm thành công!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setProductInfo(productInfo.filter((product) => product.id !== param));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        {successMessage && <SystemSuccessMessage message={successMessage} />}
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
                onChange={handleSearch}
              />
              <div className="absolute right-3 top-3">
                <SearchIcon className="text-[#A2A3A6]" />
              </div>
            </div>
            <Button
              variant="contained"
              className="bg-[#899BE0]"
              disabled={role !== "ADMIN"}
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
              rows={flattenedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchResult.toLowerCase())
              )}
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
