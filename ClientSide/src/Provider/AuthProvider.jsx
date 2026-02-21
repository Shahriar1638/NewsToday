/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("news_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading] = useState(false);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("news_user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("news_user");
  };

  const authInfo = {
    user,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
