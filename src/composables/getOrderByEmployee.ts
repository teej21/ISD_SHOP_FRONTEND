import { Order } from "../interface/IUSerInfo";

const getOrderByEmployee = async (id: string | undefined, access_token: string | null) => {
    const response = await fetch(`http://localhost:8686/orders/employees/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
    })
    const data : Order[] = await response.json();
    return data;
}

export default getOrderByEmployee;