import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

//local storage
const getData = (key) => {
  let data = JSON.parse(localStorage.getItem(key)) || false;
  return data;
};
const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

//cookies
function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("" || getData("username"));

  const login = (username) => {
    setName(username);
    // setToken(token);
    setAuth(true);
  };
  const logout = () => {
    // setToken("");
    setName("");
    setAuth(false);
  };
  console.log(getCookie("token"));
  useEffect(() => {
    // setData("token", token);
    setData("username", name);
  }, [auth]);
  return (
    <AuthContext.Provider value={{ login, logout, name, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
