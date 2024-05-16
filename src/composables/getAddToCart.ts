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
    const response = await fetch("http://localhost:8686/order-details", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(params),
    })
        const data : ResponseBody = await response.json();
        return data;
}


export default getAddToCart;