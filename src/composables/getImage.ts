export const fetchImage = async (thumbnail : string | null) => {
    try {
      console.log(thumbnail);
      const response = await fetch(`http://localhost:8686/products/images/${thumbnail}`);
      console.log(response);
      const image : Blob = await response.blob();
      const outputImage = URL.createObjectURL(image);
      return outputImage;
    } catch (error) {
      console.log(error);
    }
  };
