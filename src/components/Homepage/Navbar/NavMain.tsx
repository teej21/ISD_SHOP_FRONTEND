import React, { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import { ClickBarContext } from "../../../context/ClickForHomepage.tsx";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getCategories } from "../../../composables/getCategories.ts";
import { ProductGet } from "../../../interface/IProduct.ts";
import { getProductByID } from "../../../composables/getProductByID.ts";
import { fetchImage } from "../../../composables/getImage.ts";

interface ResponseBody {
  id: string;
  name: string;
}

export interface ResponseProductBody {
  id: string;
  name: string;
  price: number;
  thumbnail: string | null;
  thumbnailImage: string | undefined;
  status: string;
}

const NavMain = () => {
  const clickBar = useContext(ClickBarContext);
  const [categories, setCategories] = useState<ResponseBody[]>([{id: "", name: ""}]);
  const [products, setProducts] = useState<ResponseProductBody[]>([{id: "", name: "", price: 0, thumbnail: "", thumbnailImage: "", status: ""}]);
  const [thumbnailFetched, setThumbnailFetched] = useState<boolean[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const navigate = useNavigate();
  const handleNaviagation = (id: string) => {
    navigate(`/category/${id}`)
  }
  useEffect(() => {
    const fetchList = async () => {
      try {
        const categoriesData: ResponseBody[] = await getCategories(null);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);

const handleCategoryHover = async (categoryId: string) => {
  setActiveCategory(categoryId);
  try {
    const productData: ProductGet[] = await getProductByID(categoryId);
    setProducts(productData.slice(0,3));
    setThumbnailFetched(Array(productData.length).fill(false));
  } catch (error) {
    console.error(error);
  }
};

  const fetchThumbnails = async (index: number) => {
    const outputImage = await fetchImage(products[index].thumbnail);
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        thumbnailImage: outputImage,
      };
      return updatedProducts;
    });
    setThumbnailFetched((prevThumbnailFetched) => {
      const updatedThumbnailFetched = [...prevThumbnailFetched];
      updatedThumbnailFetched[index] = true;
      return updatedThumbnailFetched;
    });
  };

  useEffect(() => {
    products.forEach((_, index) => {
      if (!thumbnailFetched[index]) {
        fetchThumbnails(index);
      }
    });
  }, [products, thumbnailFetched]);

  return (
    <>
      <div
        className={`${
          clickBar.barClick
            ? "fixed inset-0 bg-black bg-opacity-50 z-10 flex"
            : ""
        }`}
      >
        <div
          className={` md:bg-[#6C5070] bg-white shadow-shadow_primary md:w-full md:w-full w-[260px] relative ${
            clickBar.barClick ? "" : "md:block hidden"
          }`}
        >
          <ul className="box-border 2xl:flex 2xl:flex-row 2xl:justify-evenly 2xl:gap-[20px] md:grid md:grid-cols-smallGrid md:justify-center md:items-center flex flex-col gap-x-[40px] gap-y-[30px] md:w-full ">
            <li className="flex flex-row md:p-6 md:gap-[5px]">
              <div className="md:text-white md:flex md:justify-between md:items-center md:font-bold md:block hidden">
                <MenuIcon
                  className="md:hidden block"
                  onClick={clickBar.handleBarClick}
                ></MenuIcon>
                <span className="xl:text-xl lg:text-sm text-base">
                  DANH MỤC SẢN PHẨM
                </span>
              </div>
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex flex-row gap-[5px] items-center md:gap-[5px] relative hover:bg-[#DF6A6A] p-6"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={() => setActiveCategory("")}
              >
                <div className="md:text-white md:flex md:justify-between md:items-center text-[#666666D9] font-bold">
                  <Link to={`/${category.id}`}>
                    <span className="xl:text-xl lg:text-sm text-base">
                      {category.name}
                    </span>
                  </Link>
                  {activeCategory === category.id && (
                    <div className="flex flex-col gap-[20px] absolute top-full bg-white border border-2 border-solid border-black z-10 w-[250px] shadow-shadow-primary ">
                      {products
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex flex-row items-center gap-2 p-4 hover:bg-[#DF6A6A]"
                            onClick={() => handleNaviagation(product.id)}
                          >
                            <img
                              src={product.thumbnailImage}
                              alt={product.name}
                              className="w-24 h-24 object-contain"
                            />
                            <div className="text-center flex flex-col">
                              <p className="text-base text-black">{product.name}</p>
                              <p className="text-base text-red-500 font-bold">{product.price}đ</p>
                            </div>
                          </div>
                        ))}
                        <h1 className="text-black font-bold text-center">And more...</h1>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {clickBar.barClick && (
              <>
                <li className="flex flex-row gap-[5px] items-center p-6 hover:bg-[#DF6A6A] ">
                  <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                    <Link to="/login">ĐĂNG NHẬP</Link>
                    <ExpandMoreIcon></ExpandMoreIcon>
                  </div>
                </li>
                <li className="flex flex-row gap-[5px] items-center p-6 hover:bg-[#DF6A6A]">
                  <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                    <Link to="/sign_up">ĐĂNG KÍ</Link>
                    <ExpandMoreIcon></ExpandMoreIcon>
                  </div>
                </li>
                <li className="flex flex-row gap-[5px] items-center hover:bg-[#DF6A6A] p-6">
                  <div className="md:hidden block md:text-white text-[#666666D9] font-bold flex gap-[10px] items-center">
                    <FacebookIcon />
                    <TwitterIcon />
                    <MailIcon />
                  </div>
                </li>
              </>
            )}
          </ul>
          <div className="md:hidden block">
            <CloseIcon
              className="absolute top-2 right-2 "
              onClick={clickBar.handleBarClick}
            ></CloseIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMain;
