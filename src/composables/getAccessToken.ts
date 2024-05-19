import { useState, useEffect } from 'react';

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccessToken = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
        console.log("Finished");
      }
      setLoading(false);
    };
    getAccessToken();
  }, []);

  return { accessToken, loading };
};

export default useAccessToken;

