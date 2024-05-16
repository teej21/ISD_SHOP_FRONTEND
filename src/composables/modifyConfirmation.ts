import Swal from "sweetalert2";
import { Order } from "../interface/IUserInfo.ts";
import { InputForm } from "../validation/PaymentForm";
const modifyConfirmation = async (access_token: string | null, params: InputForm, callback) => {
  try {
    const response = await fetch(`http://localhost:8686/orders/user/${11}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(params),
    });
    if(response.ok){
    const data: Order = await response.json();
    Swal.fire({
        title: "Mua hàng thành công!",
        text: "Người tư vấn sẽ liên lạc với bạn sớm, cảm ơn vì đã mua hàng của chúng tôi",
        icon: "success", 
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Trở về trang chủ"
    }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
      });
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default modifyConfirmation;
