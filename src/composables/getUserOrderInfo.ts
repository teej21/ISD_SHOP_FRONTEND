const getUserOrderInfo = async (access_token: string | null, id: string | undefined) => {
    const response = await fetch('http://localhost:8686/orders/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    const data = await response.json();
    return data;
}

export default getUserOrderInfo;