import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Plus } from "lucide-react";
export const AuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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

  return (
    <div className="flex bg-stone-900 border-1 border-neutral-200 p-4 z-40 sticky top-0">
      <div>
        <Link to = "/home">
          <h1 className="font-extrabold text-white">Reelay</h1>
        </Link>
      </div>
      <div className="flex w-full justify-end gap-x-10">
        <Link to="/user">
          <button className="font-normal text-white transition-all duration-300 hover:scale-110">
            <User />
          </button>
        </Link>
        <Link to="/create-chat">
          <button className="font-normal text-white transition-all duration-300 hover:scale-110">
            <Plus />
          </button>
        </Link>

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
