import { useState, useEffect } from "react";

function useAccessToken() {
 const [accessToken, setAccessToken] = useState<string | null>(null);

 useEffect(() => {
    const getAccessToken = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      }
    };
    getAccessToken();
 }, []);
 return accessToken;
}

export default useAccessToken;

