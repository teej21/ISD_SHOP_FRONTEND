const getOrderProductDetail = async (access_token : string | null, id: string | undefined) => {
    const response = await fetch("http://localhost:8686/order-details/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA5ODI0ODU0NDUiLCJ1c2VySWQiOiIzNiIsImV4cCI6MTcxNjIzMjk4M30.jdepjOwBxJFwkPaZp_FaBndOGVtZ62B6A5NjnAqKa34`,
        },
    });
    if(response.ok){
        const data = await response.json();
        return data;
    } 
    return;
}


export default getOrderProductDetail;