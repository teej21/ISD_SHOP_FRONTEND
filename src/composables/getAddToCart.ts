import failMessage from "../components/LoadingFrame/FailMessage.ts";
import SuccessMessage from "../components/LoadingFrame/SuccessMessage.ts";

interface ResponseBody {
    orderdetail_id: number,
    order_id: number,
    product_id: number,
    product_price: number,
    product_name: string,
    product_thumbnail: string,
}


interface InputBody{
    user_id: number,
    product_id: number | null,
}
const getAddToCart = async (accessToken : string | null, params: InputBody) => {
    try{const response = await fetch("http://localhost:8686/order-details", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(params),
    })
    if(response.ok){
        const data : ResponseBody = await response.json();
        SuccessMessage("Thêm sản phẩm thành công!");
        return data;
    }
    else{
        failMessage("Sản phẩm đã có trong giỏ hàng hoặc có người đã đặt hoặc mua.");
    }}
    catch(error){
        failMessage("Sản phẩm đã có trong giỏ hàng hoặc có người đã đặt hoặc mua.");
    }
        
}


export default getAddToCart;