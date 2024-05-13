import React, { createContext, useState, useEffect } from "react";
interface AddToCartElement {
  id: number | undefined;
  thumbnail: string;
  price: number;
  name: string,
}

interface ResponseBody {
  categoryName: string;
  description: string;
  height: number;
  width: number;
  id: number | undefined;
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
  announcement: string;
  handleAddToCart: () => void;
  fetchProductDetails: (id: number | undefined) => void,
  setAddToCartProductList: React.Dispatch<React.SetStateAction<AddToCartElement[]>>;
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
  announcement: "",
  handleAddToCart: () => {},
  fetchProductDetails: (id: number | undefined) => {},
  setAddToCartProductList: () => {},
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
  const [announcement, setAnnouncement] = useState<string>("");
  const handleAddToCart = () => {
    if (AddToCartProductList.findIndex(item => item.id === productInfo.id) === -1) {
      setAddToCartProductList(prev => [...prev, { id: productInfo.id, thumbnail: productInfo.thumbnail, price: productInfo.price, name: productInfo.name }]);
      setAnnouncement("Thêm sản phẩm thành công!");
    } else {
      setAnnouncement("Sản phẩm đã tồn tại trong giỏ!");
    }
  };

  const fetchProductDetails = async (id: number | undefined) => {
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
    <CartContext.Provider value={{ productInfo, AddToCartProductList, announcement, handleAddToCart, fetchProductDetails, setAddToCartProductList }}>
      {children}
    </CartContext.Provider>
  );
};

export {AddToCartContext, CartContext};
