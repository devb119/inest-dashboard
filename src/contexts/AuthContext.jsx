import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
});

const AuthProvider = ({ children }) => {
  const localToken = localStorage.getItem("access-token");
  const localUser = JSON.parse(localStorage.getItem("current-user")) || null;

  const [user, setUser] = useState(localUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localToken);
  const navigate = useNavigate();

  const login = (values) => {
    const { username, password } = values;
    if (username === "inest" && password === "inestadmin") {
        const loggedInUser = {
          name: "inest",
          id: 1,
        };
        localStorage.setItem("current-user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        localStorage.setItem("access-token", "password");
        setIsLoggedIn(true);
        navigate("/");
        return true;
      } else {
        return false;
      }
  };

  const logout = () => {
    localStorage.removeItem("current-user");
    localStorage.removeItem("access-token");
    navigate("/");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
