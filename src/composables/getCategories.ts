export const getCategories = async (access_token : string | null) => {
    try {
      const response = await fetch("http://localhost:8686/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
