import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Plus, Wallet, Ticket } from "lucide-react";
import { Profile } from "./profile";
import { getTicketStore } from "../../stores/authStore";
import { useEffect } from "react";
export const AuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { getTicket, loading, success, message, error } = getTicketStore();
  const nav = useNavigate();
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
    getTicket();
  }, []);

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
        {success && message ? (<div className="flex gap-x-2">
          <p className="text-white">{message}</p> <Ticket className="text-white"/>
        </div>) : null}
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
