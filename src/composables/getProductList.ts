export const getProductList = async (access_token : string | null) => {
    try {
      const response = await fetch("http://localhost:8686/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };