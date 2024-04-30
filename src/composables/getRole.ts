import { useState, useEffect } from "react";

function useRole() {
 const [role, setRole] = useState<string | null>(null);

 useEffect(() => {
    const getAccessToken = () => {
      const role = localStorage.getItem("role");
      if (role) {
        setRole(role);
      }
    };
    getAccessToken();
 }, []);

 return role;
}

export default useRole;
