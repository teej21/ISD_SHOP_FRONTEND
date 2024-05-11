import React from "react";
import NavCover from "../../Homepage/Navbar/NavCover.tsx";
import NavMain from "../../Homepage/Navbar/NavMain.tsx";
import VerticalCategory from "./VerticalCategory.tsx";
import ToolBar from "../../Homepage/Navbar/Toolbar.tsx";
import CategoryDetail from "./CategoryDetail.tsx";
import Footer from "../../Homepage/Footer/Footer.tsx";
const CategoryTotal = () => {
  return (
    <div>
      <NavCover></NavCover>
      <ToolBar></ToolBar>
      <NavMain></NavMain>
      <div className="flex flex-row items-start mx-auto">
      <VerticalCategory />
      <CategoryDetail></CategoryDetail>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CategoryTotal;
