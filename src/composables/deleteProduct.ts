interface ResponseBody{
    result: string,
}
const deleteProduct = async (id: number | undefined, access_token: string | null) => {
    console.log(access_token);
    
    const response = await fetch(`http://localhost:8686/order-details/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    const data = response.json();
    return data;
}

export default deleteProduct;