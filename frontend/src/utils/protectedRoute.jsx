import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/authHeader";
import { Header } from "../components/header";

export const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nav = useNavigate();
  let header = <Header />;

  if (userInfo) header = <AuthHeader />;
  useEffect(() => {
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <div className="flex-1">{children}</div>
    </div>
  );
};
