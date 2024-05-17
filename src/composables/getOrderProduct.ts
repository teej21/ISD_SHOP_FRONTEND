const getOrderProduct = async (access_token : string | null, id: string | undefined) => {
    const response = await fetch("http://localhost:8686/order-details/order/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
    if(response.ok){
        const data = await response.json();
        return data;
    } 
    return;
}


export default getOrderProduct;