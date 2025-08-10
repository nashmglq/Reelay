import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Plus, Wallet, Ticket } from "lucide-react";
import { Profile } from "./profile";
import { getTicketStore } from "../../stores/authStore";
import { useEffect } from "react";

export const AuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { getTicket, loading, success, message, error } = getTicketStore();
  const nav = useNavigate();

  // Helper function to check if token is valid/not expired
  const isTokenValid = () => {
    if (!userInfo || !userInfo.token) {
      return false;
    }

    // If your token has an expiration field, check it
    if (userInfo.expiresAt) {
      return new Date().getTime() < new Date(userInfo.expiresAt).getTime();
    }

    // If using JWT, you can decode and check expiration
    try {
      const tokenPayload = JSON.parse(atob(userInfo.token.split('.')[1]));
      if (tokenPayload.exp) {
        return Date.now() < tokenPayload.exp * 1000;
      }
    } catch (e) {
      console.error('Error parsing token:', e);
      return false;
    }

    // If no expiration info available, assume token exists = valid
    // (though you might want to make a lightweight validation call instead)
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
    // Only call getTicket if we have a valid token
    if (isTokenValid()) {
      getTicket();
    } else if (userInfo) {
      // Token exists but is invalid/expired - logout user
      console.log('Token expired or invalid, logging out...');
      localStorage.removeItem("userInfo");
      nav("/");
    }
    // If no userInfo at all, user is already logged out
  }, []);

  // Optional: Also handle the case where API returns 401/403
  useEffect(() => {
    if (error && (error.status === 401 || error.status === 403)) {
      console.log('API returned unauthorized, logging out...');
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
      <div className="flex w-full justify-end gap-x-10">
        <button
          className="
          sm:hidden
          font-normal text-white transition-all duration-300 hover:scale-110"
        >
          <Profile />
        </button>
        {success && message ? (
          <div className="flex gap-x-2">
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