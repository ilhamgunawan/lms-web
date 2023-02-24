import { useState } from "react";
import appRoutes from "../routes";
import useStore from "../stores";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setMyAccount } = useStore(state => state);

  function logout() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(false);
      setMyAccount(undefined);
      window.location.replace(appRoutes.login.path);
      setIsLoading(false);
    }, 1000);
  } 
  
  return { logout, isLoading };
}

export { useLogout };
