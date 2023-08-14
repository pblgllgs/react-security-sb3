/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getAuthentication } from "../auth/services/authService";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticatedStatus, setAuthenticatedStatus] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      token = jwtDecode(token);
      setUser({
        username: token.sub,
        roles: token.scopes,
      });
    }
  }, []);

  const login = async (emailAndPassword) => {
    const response = await getAuthentication(emailAndPassword);
    setUser(response.data.userDto);
    setAuthenticatedStatus(true);
    return response;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticatedStatus(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logOut,
        authenticatedStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
