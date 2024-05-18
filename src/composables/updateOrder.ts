import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";

interface InputBody {
    orderId: number,
    name: string,
    address: string,
    phone: string,
    note? : string,
    status: string,
}


const updateOrder = async (access_token: string | null, params: InputBody, callback) => {
    const response = await fetch('http://localhost:8686/orders/employees/update-orders', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(params),
        });
        if(response.ok){
            SuccessMessage("Cập nhật đơn hàng thành công!");
            console.log(await response.json());
            callback();
        }
    }

export default updateOrder;