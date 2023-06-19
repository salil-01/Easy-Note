import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const getData = (key) => {
  let data = JSON.parse(localStorage.getItem(key)) || false;
  return data;
};
const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("" || getData("token"));
  const [auth, setAuth] = useState(false || getData("auth"));
  const [name, setName] = useState("" || getData("username"));
  const login = (username) => {
    setName(username);
    // setToken(token);
    setAuth(true);
  };
  const logout = () => {
    setToken("");
    setName("");
    setAuth(false);
  };
  useEffect(() => {
    setData("token", token);
    setData("username", name);
    setData("auth", auth);
  }, [auth]);
  return (
    <AuthContext.Provider value={{ login, logout, token, name, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
