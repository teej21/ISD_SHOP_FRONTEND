import React from "react";
import Picture_1 from "../../../assets/pic_1.png";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
interface ResponseBody {
  thumbnail: string;
  name: string;
  id: number;
}
const GridBox = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ResponseBody[]>([
    { id: 0, name: "", thumbnail: "" },
  ]);
  const handleNavigate = (id: number) => {
    navigate(`/category/${id}`, { replace: true });
    window.scrollTo(0,200);
   };
   
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await fetch("http://localhost:8686/products");
        if (response.ok) {
          const data: ResponseBody[] = await response.json();
          const slicedData = data.slice(0, 10);
          setProducts(slicedData);
          slicedData.forEach((product) => fetchImage(product.thumbnail));
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchImage = async (thumbnail: string) => {
      try {
        const response = await fetch(
          `http://localhost:8686/products/images/${thumbnail}`
        );
        const imageBlob: Blob = await response.blob();
        const outputImage = URL.createObjectURL(imageBlob);
        if (response.ok) {
          setProducts((products) => {
            return products.map((product) => {
              if (product.thumbnail === thumbnail) {
                return { ...product, thumbnail: outputImage };
              }
              return product;
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductList();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-auto my-8 w-8/10 max-w-[1200px]">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center border-4 border-[#f2f5f6] border-solid rounded-[10px] hover:-translate-y-4 hover:shadow-shadow_primary transition ease-in-out duration-300"
          onClick={() => handleNavigate(product.id)}
          role="button"
          tabIndex={0}
        >
          <div className="w-full h-8/10 flex flex-col">
            <img
              src={product.thumbnail}
              className="w-full h-8/10 object-cover rounded-[10px]"
              alt={product.name}
            ></img>
            <h1 className="font-bold text-lg text-center">{product.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridBox;
