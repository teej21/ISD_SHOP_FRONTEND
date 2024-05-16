import Swal from "sweetalert2";

const successMessage = (callback) => {
    Swal.fire({
        title: "Mua hàng thành công!",
        text: "Người tư vấn sẽ liên lạc với bạn sớm, cảm ơn vì đã mua hàng của chúng tôi",
        icon: "success", 
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Trở về trang chủ"
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
      });
}

export default successMessage;
