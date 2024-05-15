import React from "react";
import NavCover from "../../Homepage/Navbar/NavCover.tsx";
import NavMain from "../../Homepage/Navbar/NavMain.tsx";
import VerticalCategory from "./VerticalCategory.tsx";
import ToolBar from "../../Homepage/Navbar/Toolbar.tsx";
import CategoryDetail from "./CategoryDetail.tsx";
import Footer from "../../Homepage/Footer/Footer.tsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Error_page from "../../ErrorPage/Error_page.tsx";
const CategoryTotal = () => {
  const { id } = useParams();
  const [productExists, setProductExists] = useState(false);

  useEffect(() => {
    const checkProductExistence = async () => {
      const exists = await fetch(`http://localhost:8686/categories/${id}`);
      setProductExists(exists.ok);
    };

    if (id) {
      checkProductExistence();
    }
  }, [id]);
  return (
    <div>
      {productExists ? (
        <>
          <NavCover></NavCover>
          <ToolBar></ToolBar>
          <NavMain></NavMain>
          <div className="flex flex-row items-start mx-auto">
            <VerticalCategory />
            <CategoryDetail></CategoryDetail>
          </div>
          <Footer></Footer>
        </>
      ) : (
        <Error_page></Error_page>
      )}
    </div>
  );
};

export default CategoryTotal;
