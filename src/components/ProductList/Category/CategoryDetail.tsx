import React, { useState, useEffect } from 'react';
import { ICategories } from '../../../interface/ICategory.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByID } from '../../../composables/getProductByID.ts';
import { ProductShortInfo } from '../../../interface/IProduct.ts';
import { fetchImage } from '../../../composables/getImage.ts';

const CategoryDetail = () => {
  const [categories, setCategories] = useState<ICategories>({
    id: "",
    name: "",
    description: "",
  });

  const [products, setProducts] = useState<ProductShortInfo[]>([]);

  const [thumbnailFetched, setThumbnailFetched] = useState<boolean[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const handleNaviagation = (id: string) => {
    navigate(`/category/${id}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8686/categories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);

        const productData = await getProductByID(categoriesData.id);
        setProducts(productData);

        setThumbnailFetched(Array(productData.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchThumbnails = async (index: number) => {
      const outputImage = await fetchImage(products[index].thumbnail);
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], thumbnailImage: outputImage };
        return updatedProducts;
      });
      setThumbnailFetched((prevThumbnailFetched) => {
        const updatedThumbnailFetched = [...prevThumbnailFetched];
        updatedThumbnailFetched[index] = true;
        return updatedThumbnailFetched;
      });
    };

    products.forEach((_, index) => {
      if (!thumbnailFetched[index]) {
        fetchThumbnails(index);
      }
    });
  }, [products, thumbnailFetched]);

  return (
    <div className='flex flex-col justify-center items-center gap-[20px] max-w-[1200px] m-[80px] flex-1'>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-4xl font-bold'>{categories.name} Họa Sĩ Sáng Tác Đẹp, Độc Đáo và Ấn Tượng</h1>
        <p className='text-xl text-justify'><span className='font-bold'>{categories.name}</span> {categories.description}</p>
      </div>
      <div className='w-full'>
        <h1 className='text-center text-4xl my-[40px]'>Tranh nổi bật thuộc chủ đề <span className='font-bold'>{categories.name}</span></h1>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-auto gap-[20px]'>
          {products.map((product) => (
            <div key={product.id} className='flex flex-col items-center border-4 border-[#f2f5f6] border-solid rounded-[10px] hover:-translate-y-4 hover:shadow-shadow_primary transition ease-in-out duration-300' onClick={() => handleNaviagation(product.id)}>
              {product.thumbnailImage && <img src={product.thumbnailImage} alt={product.name} className='w-full h-[70%] object-cover rounded-[10px]' />}
              <h1 className="font-bold text-lg text-center">{product.name}</h1>
              <span className="text-[#AEA093] italic text-center">100 sản phẩm</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
