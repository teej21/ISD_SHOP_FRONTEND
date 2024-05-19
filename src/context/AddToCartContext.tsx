import React, { createContext, useState, useEffect } from "react";
import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";
import failMessage from "../components/LoadingFrame/FailMessage.ts";
import confirmMessage from "../components/LoadingFrame/ConfirmMessage.ts";
import Swal from "sweetalert2";
import getAddToCart from "../composables/getAddToCart.ts";
import useAccessToken from "../composables/getAccessToken.ts";
import deleteProduct from "../composables/deleteProduct.ts";

interface AddToCartElement {
    orderdetail_id: number;
    order_id: number;
    product_id: number;
    product_price: number;
    product_name: string;
    product_thumbnail: string;
}

interface ResponseBody {
  categoryName: string;
  description: string;
  height: number;
  width: number;
  id: number | null;
  material: string;
  name: string;
  price: number;
  status: string;
  thumbnail: string | undefined;
  publishYear: string;
}

interface SuccessState {
  [index: number]: boolean;
}

const CartContext = createContext<{
  productInfo: ResponseBody;
  AddToCartProductList: AddToCartElement[];
  isDeleted: boolean;
  totalPrice: number;
  isSuccess: boolean;
  successState: SuccessState;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  handleTotalPrice: () => void;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: () => void;
  fetchProductDetails: (id: number | null) => void;
  setAddToCartProductList: React.Dispatch<React.SetStateAction<AddToCartElement[]>>;
  deleteAddToCartProduct: (id: number | null) => void;
  handleSuccess: (id: number) => void;
}>({
  productInfo: {
    categoryName: "",
    description: "",
    height: 0,
    width: 0,
    id: 0,
    material: "",
    name: "",
    price: 0,
    status: "",
    thumbnail: "",
    publishYear: "",
  },
  AddToCartProductList: [],
  isDeleted: false,
  totalPrice: 0,
  isSuccess: false,
  successState: {},
  setIsSuccess: () => {},
  handleTotalPrice: () => {},
  setIsDeleted: () => {},
  handleAddToCart: () => {},
  fetchProductDetails: (id: number | null) => {},
  setAddToCartProductList: () => {},
  deleteAddToCartProduct: (id: number | null) => {},
  handleSuccess: (id: number) => {},
});

const AddToCartContext = ({ children }: { children: React.ReactNode }) => {
  const [productInfo, setProductInfo] = useState<ResponseBody>({
    categoryName: "",
    description: "",
    height: 0,
    width: 0,
    id: 0,
    material: "",
    name: "",
    price: 0,
    status: "",
    thumbnail: "",
    publishYear: "",
  });
  const [AddToCartProductList, setAddToCartProductList] = useState<AddToCartElement[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successState, setSuccessState] = useState<SuccessState>({});
  const { accessToken, loading } = useAccessToken();
  const uid : string | null = localStorage.getItem("userId");

  const handleAddToCart = async () => {
    try {
      if (uid) {
        const addToCartProduct = await getAddToCart(accessToken, {
          product_id: productInfo.id,
          user_id: +uid,
        });
  
        if (addToCartProduct) {
          if (!AddToCartProductList.some(item => item.product_id === addToCartProduct.product_id)) {
            const outputImage = await fetchImage(addToCartProduct.product_thumbnail);
            if (outputImage) {
              addToCartProduct.product_thumbnail = outputImage;
              setAddToCartProductList(prev => [...prev, addToCartProduct]);
              SuccessMessage("Thêm sản phẩm thành công!");
            } else {
              failMessage("Sản phẩm đã có trong giỏ hàng.");
            }
          } else {
            failMessage("Sản phẩm đã có trong giỏ hàng.");
          }
        } else {
          failMessage("Không thể thêm sản phẩm vào giỏ hàng.");
        }
      } else {
        failMessage("Người dùng không hợp lệ.");
      }
    } catch (error) {
      failMessage("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const deleteAddToCartProduct = (id: number | null) => {
    if (id) {
      Swal.fire({
        title: "Bạn có muốn xóa sản phẩm này?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`http://localhost:8686/order-details/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            });
  
            if (!response.ok) {
              console.log(response);
              
            }
  
            const data = await response.json();
            SuccessMessage(data.result);
            setAddToCartProductList(prev => prev.filter(item => item.orderdetail_id !== id));
            setIsDeleted(true);
          } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'There was a problem deleting the product.', 'error');
          }
        }
      });
    }
  };

  const fetchProductDetails = async (id: number | null) => {
    try {
      const response = await fetch(`http://localhost:8686/products/${id}`);
      const data = await response.json();
      if (response.ok && data.thumbnail) {
        const outputImage = await fetchImage(data.thumbnail);
        setProductInfo({
          categoryName: data.category.name,
          description: data.description,
          height: data.height,
          width: data.width,
          id: data.id,
          material: data.material,
          name: data.name,
          price: data.price,
          status: data.status,
          thumbnail: outputImage,
          publishYear: data.publishYear,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async (thumbnail: string) => {
    try {
      const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`, {});
      if (response.ok) {
        const image: Blob = await response.blob();
        const outputImage = URL.createObjectURL(image);
        return outputImage;
      } else {
        console.error("Failed to fetch image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleTotalPrice = () => {
    let totalPrice = 0;
    AddToCartProductList.forEach((product) => {
      totalPrice += product.product_price;
    });
    setTotalPrice(totalPrice);
  };

  const handleSuccess = (id: number) => {
    setSuccessState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    console.log(successState);
  };


  return (
    <CartContext.Provider value={{ productInfo, AddToCartProductList, totalPrice, handleAddToCart, fetchProductDetails, setAddToCartProductList, deleteAddToCartProduct, isDeleted, setIsDeleted, handleTotalPrice, handleSuccess, isSuccess, setIsSuccess, successState }}>
      {children}
    </CartContext.Provider>
  );
};

export { AddToCartContext, CartContext };
