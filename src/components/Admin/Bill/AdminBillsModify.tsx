import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import schema from "../../../validation/ModifyForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClickAdmin } from "../../../context/AdminController.tsx";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import useAccessToken from "../../../composables/getAccessToken.ts";
import AdminHorizontal from "./../AdminHorizontal.tsx";
import getUserOrderInfo from "../../../composables/getUserOrderInfo.ts";
import updateOrder from "../../../composables/updateOrder.ts";
import getOrderProduct from "../../../composables/getOrderProduct.ts";
import { fetchImage } from "../../../composables/getImage.ts";

interface InputBody {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  note?: string;
  status: string;
  thumbnail: string[] | null; 
}

interface AddToCartElement {
  orderdetail_id: number;
  order_id: number;
  product_id: number;
  product_price: number;
  product_name: string;
  product_thumbnail: string | null;
}

const AdminBillsModify = () => {
  const [orderDetail, setOrderDetail] = useState<InputBody>({
    id: 0,
    name: "",
    address: "",
    phoneNumber: "",
    note: "",
    status: "",
    thumbnail: null,
  });
  const [orderedProduct, setOrderedProduct] = useState<AddToCartElement[]>([]);
  const navigate = useNavigate();
  const nav = useContext(ClickAdmin);
  const { id } = useParams();
  const { accessToken, loading } = useAccessToken();
  const [thumbnailFetched, setThumbnailFetched] = useState<boolean[]>([]);
  const handleNavigation = () => {
    nav.handleSetMode("bills");
    navigate(-1);
  };

  const handleImg = (id: number) => {
    navigate(`/admin/products/${id}`);
  }

  const handleMoreImg = (id: string) => {
    navigate(`/admin/order/${id}/img`)
  }

  const fetchOrderData = async (access_token: string | null) => {
    if (!access_token) return;
    const data = await getUserOrderInfo(access_token, id);
    setOrderDetail(data);
  };

  const fetchOrderProduct = async (accessToken: string | null) => {
    const data = await getOrderProduct(accessToken, id);
    setThumbnailFetched(Array(orderedProduct.length).fill(false));
    setOrderedProduct(data);
  };

  useEffect(() => {
    if (!loading && accessToken) {
      fetchOrderProduct(accessToken);
      fetchOrderData(accessToken);
    }
  }, [accessToken, id, loading]);

  const fetchThumbnails = async (index: number) => {
    if (orderedProduct) {
      const outputImage = await fetchImage(
        orderedProduct[index].product_thumbnail
      );
      setOrderedProduct((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          product_thumbnail: outputImage,
        };
        return updatedProducts;
      });
    }
    setThumbnailFetched((prevThumbnailFetched) => {
      const updatedThumbnailFetched = [...prevThumbnailFetched];
      updatedThumbnailFetched[index] = true;
      return updatedThumbnailFetched;
    });
  };

  useEffect(() => {
    if (orderedProduct) {
      orderedProduct.forEach((_, index) => {
        if (!thumbnailFetched[index]) {
          fetchThumbnails(index);
        }
      });
    }
  }, [orderDetail, thumbnailFetched]);


  const resetInfo = () => {
    setOrderDetail({
      id: 0,
      name: "",
      address: "",
      phoneNumber: "",
      note: "",
      status: "",
      thumbnail: null,
    });
  };

  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    await updateOrder(
      accessToken,
      {
        orderId: orderDetail.id,
        name: orderDetail.name,
        address: orderDetail.address,
        phone: orderDetail.phoneNumber,
        note: orderDetail.note,
        status: orderDetail.status,
      },
      handleNavigation
    );


  };

  const {
    register,
    handleSubmit,
    reset,
    formState : { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: orderDetail,
    mode: 'onChange',
    values: orderDetail,
  });

  const onFormError: SubmitErrorHandler<InputBody> = (errors, event) => {
    console.log("Form submission error:", errors);
  };

  return (
    <div>
      <AdminHorizontal />
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-[#D9D9D9]">
        <div>
          <div className="flex flex-row justify-between items-center px-8 py-4">
            <div>
              <h1 className="font-bold text-2xl">
                Chỉnh sửa hóa đơn khách hàng
              </h1>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px]">
              <div>
                <Button
                  variant="contained"
                  className="bg-[#899BE0]"
                  onClick={handleNavigation}
                >
                  <div className="flex items-center gap-[10px]">
                    <KeyboardReturn />
                    <span>Trở về</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4 px-8 py-4 bg-[#EEF0F1] h-[75%] w-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form onSubmit={handleSubmit(submitForm, onFormError)} className="w-full h-full">
            <div className="flex flex-row justify-between items-center h-full gap-[70px]">
              <div className="flex flex-col justify-between h-[80%] w-full">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Tên khách hàng
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("name")}
                    value={orderDetail.name}
                    onChange={handleInfo}
                  />
                  {errors.name &&  <span className="text-red-500 font-bold text-xl">{errors.name.message}</span>}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Số điện thoại:
                  <input
                    type="text"
                    id="phoneNumber"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("phoneNumber")}
                    value={orderDetail.phoneNumber}
                    onChange={handleInfo}
                  />
                   {errors.phoneNumber && <span className="text-red-500 font-bold text-xl">{errors.phoneNumber.message}</span>}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Trạng thái:
                  <select {...register("status")} value={orderDetail.status}
                    onChange={handleInfo} className="w-full p-2 border-2 border-solid border-black">
                    <option selected disabled value="">Trạng thái</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SHIPPING">SHIPPING</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </label>
              </div>
              <div className="flex flex-col justify-between h-[80%] w-full">
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Ghi chú:
                  <input
                    type="text"
                    id="note"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("note")}
                    value={orderDetail.note || ""}
                    onChange={handleInfo}
                  />
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px] mt-[50px]">
                  Địa chỉ:
                  <input
                    type="text"
                    id="address"
                    className="w-full p-2 border-2 border-solid border-black"
                    {...register("address")}
                    value={orderDetail.address}
                    onChange={handleInfo}
                  />
                   {errors.address && <span className="text-red-500 font-bold text-xl">{errors.address.message}</span>}
                </label>
                <label className="flex flex-col text-xl font-bold gap-[10px]">
                  Sản phẩm
                  <div className="flex flex-row gap-[20px]">
                    {orderedProduct.slice(0, 4).map((product) => (
                      <div>
                        <div
                          key={product.order_id}
                          className="w-[100px] h-[100px]"
                          onClick={() => handleImg(product.product_id)}
                        >
                          <img
                            src={product.product_thumbnail}
                            alt="product"
                            className="w-full h-full object-fit"
                          ></img>
                        </div>
                      </div>
                    ))}
                    {orderedProduct.length > 4 && <span onClick={() => handleMoreImg(id)}>And {orderedProduct.length - 4} more,<br/><span className="font-bold">nhấn để xem tiếp</span></span>}
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-[40px]">
              <Button
                className="bg-emerald-600 text-white text-xl font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900"
                onClick={resetInfo}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 text-white text-xl font-bold px-12 py-4 cursor-pointer hover:bg-emerald-900"
              >
                Lưu
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBillsModify;
