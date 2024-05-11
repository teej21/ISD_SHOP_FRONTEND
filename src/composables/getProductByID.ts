interface ResponseBody {
  id: string;
  name: string;
  thumbnail: string;
}
export const getProductByID = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8686/products/category=${id}`
    );
    const data: ResponseBody = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
