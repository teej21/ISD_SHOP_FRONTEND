const getOrderById = async (userId: number, access_token: string) => {
    const response = await fetch(`http://localhost:8686/orders/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `${access_token}`,
        }
    })
}