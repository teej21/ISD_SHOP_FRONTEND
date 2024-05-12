import React, { useContext } from "react";
import { CartContext } from "../../context/AddToCartContext.tsx";

const AddToCartDetail = () => {
    const productList = useContext(CartContext);
    console.log(productList);
    
  return (
    <div>
      <div className="p-16">
        <span className="font-bold text-[#8D8D8D]">TRANG CHỦ /</span>
        <span className="font-bold text-[#8D8D8D]">Giỏ hàng</span>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-[#8D8D8D] text-center">
          Giỏ Hàng
        </h1>
      </div>
      <div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <h1>SẢN PHẨM</h1>
            <h1>GIÁ</h1>
            <h1>SỐ LƯỢNG</h1>
            <h1>TỔNG CỘNG</h1>
          </div>
          <div></div>
        </div>
        <div className="">{productList.AddToCartProductList.map((product) => (
            <div key={product.id}>
                <div><img src={product.thumbnail} alt={product.id}></img></div>
                <div><span>{product.name}</span></div>
                <div><span>{product.price}</span></div>
            </div>
        ))}</div>
      </div>
    </div>
  );
};

export default AddToCartDetail;
