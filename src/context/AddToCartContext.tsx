import React, { createContext, useState, useEffect } from "react";
import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";
import failMessage from "../components/LoadingFrame/FailMessage.ts";
import confirmMessage from "../components/LoadingFrame/ConfirmMessage.ts";
import Swal from "sweetalert2";
interface AddToCartElement {
  id: number | null;
  thumbnail: string;
  price: number;
  name: string,
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
  thumbnail: string;
  publishYear: string;
}

const CartContext = createContext<{
  productInfo: ResponseBody;
  AddToCartProductList: AddToCartElement[];
  isDeleted: boolean,
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
  const handleAddToCart = () => {
    if (AddToCartProductList.findIndex(item => item.id === productInfo.id) === -1) {
      setAddToCartProductList(prev => [...prev, { id: productInfo.id, thumbnail: productInfo.thumbnail, price: productInfo.price, name: productInfo.name }]);
      SuccessMessage("Thêm sản phẩm thành công!");
    } else {
      failMessage("Sản phẩm đã tồn tại trong giỏ!");
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
          setAddToCartProductList(prev => prev.filter(item => item.id !== id));
          setIsDeleted(true);
      }
    });
    }
  };

  const fetchProductDetails = async (id: number | null) => {
    try {
      const response = await fetch(`http://localhost:8686/products/${id}`);
      console.log(response);
      
      const data = await response.json();
      if (response.ok) {
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
          thumbnail: data.thumbnail,
          publishYear: data.publishYear,
        });
        console.log(productInfo.name);

        fetchImage(data.thumbnail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async (thumbnail: string) => {
    try {
      console.log(thumbnail);
      const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`);
      console.log(response);
      const image: Blob = await response.blob();
      const outputImage = URL.createObjectURL(image);
      if (response.ok) {
        setProductInfo(data => ({ ...data, thumbnail: outputImage }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ productInfo, AddToCartProductList, handleAddToCart, fetchProductDetails, setAddToCartProductList, deleteAddToCartProduct, isDeleted, setIsDeleted }}>
      {children}
    </CartContext.Provider>
  );
};

export {AddToCartContext, CartContext};
