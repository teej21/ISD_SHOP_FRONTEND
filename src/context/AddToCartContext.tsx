import React, { createContext, useState, useEffect } from "react";
import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";
import failMessage from "../components/LoadingFrame/FailMessage.ts";
import confirmMessage from "../components/LoadingFrame/ConfirmMessage.ts";
import Swal from "sweetalert2";
import getAddToCart from "../composables/getAddToCart.ts";
import useAccessToken from "../composables/getAccessToken.ts";
interface AddToCartElement {
    orderdetail_id: number,
    order_id: number,
    product_id: number,
    product_price: number,
    product_name: string,
    product_thumbnail: string,
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

const CartContext = createContext<{
  productInfo: ResponseBody;
  AddToCartProductList: AddToCartElement[];
  isDeleted: boolean,
  totalPrice: number,
  handleTotalPrice: () => void,
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>,
  handleAddToCart: () => void;
  fetchProductDetails: (id: number | null) => void,
  setAddToCartProductList: React.Dispatch<React.SetStateAction<AddToCartElement[]>>;
  deleteAddToCartProduct: (id: number | null) => void,
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
  handleTotalPrice: () => {},
  setIsDeleted: () => {},
  handleAddToCart: () => {},
  fetchProductDetails: (id: number | null) => {},
  setAddToCartProductList: () => {},
  deleteAddToCartProduct: (id: number | null) => {},
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
  const access_token = useAccessToken();

  const handleAddToCart = async () => {
    try {
      const addToCartProduct = await getAddToCart(access_token, {
        product_id: productInfo.id,
        user_id: 11,
      });

      if (addToCartProduct && !AddToCartProductList.some(item => item.product_id === addToCartProduct.product_id)) {
        const outputImage = await fetchImage(addToCartProduct.product_thumbnail);
        if(outputImage){
          addToCartProduct.product_thumbnail = outputImage;
          setAddToCartProductList(prev => [...prev, addToCartProduct]);
          SuccessMessage("Thêm sản phẩm thành công!");
        }
        else{
          failMessage(addToCartProduct.error);
        }
      } else {
        failMessage(addToCartProduct.error);
      }
    } catch (error) {
      failMessage("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };


  const deleteAddToCartProduct = (id: number | null) => {
    if(id){
    Swal.fire({
      title: "Do you want delete the product?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
          SuccessMessage("Xóa sản phẩm thành công!");
          setAddToCartProductList(prev => prev.filter(item => item.product_id !== id));
          setIsDeleted(true);
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
      const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`);
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


  return (
    <CartContext.Provider value={{ productInfo, AddToCartProductList, totalPrice, handleAddToCart, fetchProductDetails, setAddToCartProductList, deleteAddToCartProduct, isDeleted, setIsDeleted, handleTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export { AddToCartContext, CartContext };
