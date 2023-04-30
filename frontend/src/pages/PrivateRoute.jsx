import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { token, auth } = useContext(AuthContext);
  const location = useLocation();
  //   console.log(token, auth);
  return token && auth ? (
    children
  ) : (
    <Navigate to={"/login"} state={location.state} replace={true} />
  );
};
