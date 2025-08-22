import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Plus, Wallet, Ticket } from "lucide-react";
import { Profile } from "./profile";
import { getTicketStore } from "../../stores/authStore";
import { useEffect } from "react";

export const AuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { getTicket, loading, success, message, error } = getTicketStore();
  const nav = useNavigate();

  const isTokenValid = () => {
    if (!userInfo || !userInfo.token) {
      return false;
    }
    if (userInfo.expiresAt) {
      return new Date().getTime() < new Date(userInfo.expiresAt).getTime();
    }
    try {
      const tokenPayload = JSON.parse(atob(userInfo.token.split('.')[1]));
      if (tokenPayload.exp) {
        return Date.now() < tokenPayload.exp * 1000;
      }
    } catch (e) {
      console.error('Error parsing token:', e);
      return false;
    }
    return true;
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      localStorage.removeItem("userInfo");
      nav("/");
    } else {
      console.error("Error during logout.");
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      getTicket();
    } else if (userInfo) {
      localStorage.removeItem("userInfo");
      nav("/");
    }
  }, []);

  useEffect(() => {
    if (error && (error.status === 401 || error.status === 403)) {
      localStorage.removeItem("userInfo");
      nav("/");
    }
  }, [error]);

  return (
    <div className="flex bg-stone-900 border-1 border-neutral-200 p-4 z-40 sticky top-0">
      <div>
        <Link to="/home">
          <h1 className="font-extrabold text-white">Reelay</h1>
        </Link>
      </div>
      <div className="flex w-full justify-end gap-x-8">
        <button
          className="
          sm:hidden
          font-normal text-white transition-all duration-300 hover:scale-110"
        >
          <Profile />
        </button> 
        {success && message ? (
          <div className="flex gap-x-2 justify-center items-center">
            <p className="text-white">{message}</p>{" "}
            <Ticket className="text-white" />
          </div>
        ) : (
          <div className="flex gap-x-2">
            <p className="text-white">0</p> <Ticket className="text-white" />
          </div>
        )}
        <button className="font-normal text-white transition-all duration-300 hover:scale-110">
          <Link to="/payment">
            <Wallet />
          </Link>
        </button>
        <button
          className="font-normal text-white transition-all duration-300 hover:scale-110"
          onClick={logoutHandler}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};