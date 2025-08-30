import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/authComp/authHeader";
import { Header } from "../components/header";

export const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token
  const nav = useNavigate();
  let header = <Header />;

  if (token) header = <AuthHeader />;
  useEffect(() => {
    if (!token) {
      nav("/");
    }
  }, [token]);

  return (
    <div>
      {header}
     {children}
    </div>
  );
};