import { AddChat } from "../components/authComp/addChat";
import { ListChat } from "../components/authComp/listChat";
import { Profile } from "../components/authComp/profile";

export const Home = () => {
  return (
    <div>
      <div className="flex p-4 gap-x-10">
        <div className="hidden sm:block w-[20%] ">
          <Profile />
        </div>
        <div className="w-[100%] sm:w-[60%]">
          <ListChat />
        </div>
      </div>

      <AddChat />
    </div>
  );
};
