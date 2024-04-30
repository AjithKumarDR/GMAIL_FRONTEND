import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
  
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [TokenExpired, setTokenExpired] = useState();
  const token = sessionStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token || "");
   
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      setTokenExpired(isExpired);
    }
  }, [token]);
  
 
  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,   
  
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
