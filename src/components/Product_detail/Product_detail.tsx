import React from "react";
import Product_main_interface from "./Product_main_interface.tsx";
import Product_additional_detail from "./Product_additional_detail.tsx";
import Footer from "../Homepage/Footer/Footer.tsx";
import SpecialPicture from "../Homepage/Items/SpecialPicture.tsx";
import NavCover from "../Homepage/Navbar/NavCover.tsx";
import NavMain from "../Homepage/Navbar/NavMain.tsx";
import ToolBar from "../Homepage/Navbar/Toolbar.tsx";
const Product_detail = () => {
  return (
    <div>
      <NavCover />
      <ToolBar />
      <NavMain />
      <div className="max-w-[1100px] mx-auto my-8">
      <Product_main_interface />
      <Product_additional_detail />
      <div className="mb-20">
        <SpecialPicture />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product_detail;
