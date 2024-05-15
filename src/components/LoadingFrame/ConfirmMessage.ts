import Swal from "sweetalert2";
import SuccessMessage from "./SuccessMessage.ts";
import { useContext } from "react";
import { CartContext } from "../../context/AddToCartContext.tsx";

const confirmMessage = (callback: any) => {
    Swal.fire({
        title: "Do you want delete the product?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
            SuccessMessage("Xóa cột thành công!");
        }
      });
}

export default confirmMessage;