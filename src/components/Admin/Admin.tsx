import React, { useContext } from "react";
import AdminNavigation from "./AdminNavigation.tsx";
import AdminContent from "./AdminContent.tsx";
import { ClickAdmin } from "../../context/AdminController.tsx";
import AdminPageDetail from "./AdminPageDetail.tsx";
import AdminEmployeeContent from "./AdminEmployeeContent.tsx";
import AdminAddUser from "./AdminAddUser.tsx";
import AdminBills from "./Bill/AdminBills.tsx";
import AdminModify from "./AdminModify.tsx";
import AdminCategoriesList from "./Categories/AdminCategoriesList.tsx";
import AdminProductList from "./Product/AdminProductList.tsx";
import AdminEmployeeDetail from "./AdminEmployeeDetail.tsx";
const Admin = () => {
  const handleNav = useContext(ClickAdmin);
  return (
    <div>
      <AdminNavigation />
      {handleNav.mode === "customer" && <AdminContent />}
      {handleNav.mode === "customer-detail" && <AdminPageDetail />}
      {handleNav.mode === "employee" && <AdminEmployeeContent />}
      {handleNav.mode === "bills" && <AdminBills />}
      {handleNav.mode === "lists" && <AdminCategoriesList/>}
      {handleNav.mode === "products" && <AdminProductList></AdminProductList>}
      {handleNav.mode === "employee-detail" && <AdminEmployeeDetail></AdminEmployeeDetail>}
    </div>
  );
};

export default Admin;
