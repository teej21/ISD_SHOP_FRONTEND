import React, { useContext, useEffect } from "react";
import { Customer, Order } from "../../../interface/IUSerInfo";
import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAccessToken from "../../../composables/getAccessToken.ts";
import useRole from "../../../composables/getRole.ts";
import SuccessMessage from "../../LoadingFrame/SuccessMessage.ts";
import getOrderProduct from "../../../composables/getOrderProduct.ts";
import getOrderByEmployee from "../../../composables/getOrderByEmployee.ts";
const AdminBills = () => {
  const [orderInfo, setOrderInfo] = useState<Order[]>([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [employeeOrderList, setEmployeeOrderList] = useState<Order[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [searchResult, setSearchResult] = useState("");
  const navHeader = useContext(ClickAdmin);
  const role = useRole();
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 100 },
    { field: "name", headerName: "Tên khách hàng", width: 200 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 200 },
    { field: "note", headerName: "Ghi chú", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "status", headerName: "Trạng thái xử lý", width: 200 },
    {
      field: "orderDetailList",
      headerName: "ID Sản phẩm",
      width: 400,
      renderCell: (params) => {
        const orderDetailList = params.value;
        const productIds = orderDetailList.map((order) => order.id).join(", ");
        return productIds;
      },
    },
    {
      field: "employee",
      headerName: "Nhân viên tư vấn",
      width: 200,
      renderCell: (params) => {
        if (role === 'ADMIN') {
          return <span>{params.row.employee[0].fullName}</span>;
        } else {
          return <span>Not Available</span>;
        }
      },
    },
    {
      field: "",
      headerName: "Sửa đơn hàng",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row gap-[40px]">
          {role === 'EMPLOYEE' && (
            <div
              onClick={(event) => {
                event.stopPropagation();
                handleEditClick(params);
              }}
            >
              <EditIcon className="text-blue-500" />
            </div>
          )}
        </div>
      )
    },
  ];

  const navigate = useNavigate();
  const { accessToken, loading } = useAccessToken();
  useEffect(() => {
    const fetchCustomerList = async () => {
      if (loading) return;
      try {
        const response = await fetch("http://localhost:8686/orders/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data: Order[] = await response.json();
          setOrderInfo(data);
          console.log(data);
        } else {
          const errorData = await response.json();
          setEmptyMessage(errorData.error);
        }
      } catch (error) {
        console.log("Failed");
      }
    };
    const getOrderById = async () => {
      const employeeId = localStorage.getItem("userId");
      if (employeeId && role === "EMPLOYEE") {
        const employeeOrder = await getOrderByEmployee(employeeId, accessToken);
        setEmployeeOrderList(employeeOrder);
      }
    };

    getOrderById();
    fetchCustomerList();
  }, [accessToken]);

  const handleSearch = (e: any) => {
    setSearchResult(e.target.value);
  };

  const handleRowClick = (params: any) => {
    const orderId = params.row.id;
    navigate(`/admin/orders/${orderId}`);
    navHeader.handleSetMode("bill-detail");
  };

  const filteredStatus = async (status: string) => {
    const response = await fetch(
      `http://localhost:8686/orders/admin/${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    setOrderInfo(data);
  };

  const handleEditClick = (params : any) => {
    const id = params.row.id;
    navigate(`/admin/orders/${id}/modify`);
  }

  return (
    <div className="absolute top-[55%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
      <div>
        <div className="flex flex-row justify-between items-center px-8 py-4">
          <div>
            <h1 className="font-bold text-2xl">Quản lý đơn hàng</h1>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="rounded-[50px] border-[#E2E2E2] border-2 border-solid p-3 bg-[#E9ECEF]"
                value={searchResult}
                onChange={handleSearch}
              />
              <div className="absolute right-3 top-3">
                <SearchIcon className="text-[#A2A3A6]" />
              </div>
            </div>
            <div>
              <select
                className="p-4 rounded-[10px] bg-[#E9ECEF]"
                onChange={(e) => filteredStatus(e.target.value)}
              >
                <option selected disabled value="">
                  Tìm kiếm trạng thái!
                </option>
                <option value="INIT">INIT</option>
                <option value="PENDING">PENDING</option>
                <option value="SHIPPING">SHIPPING</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>
        </div>
  
        {role === 'ADMIN' ? (
          orderInfo.length > 0 ? (
            <div>
              <DataGrid
                rows={orderInfo.filter((order) =>
                  order.status.toLowerCase().includes(searchResult)
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
              <h1 className="text-2xl text-red-500">No information</h1>
            </div>
          )
        ) : (
          employeeOrderList.length > 0 ? (
            <div>
              <DataGrid
                rows={employeeOrderList.filter((order) =>
                  order.status.toLowerCase().includes(searchResult)
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
              <h1 className="text-2xl text-red-500">No information</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
  
};

export default AdminBills;
