import { useState } from "react";
import appRoutes from "../routes";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  function logout() {
    setIsLoading(true);

    setTimeout(() => {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      window.location.replace(appRoutes.login.path);
      setIsLoading(false);
    }, 1000);
  } 
  
  return { logout, isLoading };
}

export { useLogout };
