
const getOrderById = async (userId: string | null, accessToken: string | null) => {
    const response = await fetch(`http://localhost:8686/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  
    if (!response.ok) {
     console.log(1);
     
    }
  
    const data = await response.json();
    return data;
  };
  

export default getOrderById;