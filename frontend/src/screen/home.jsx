import { AddChat } from "../components/authComp/addChat";
import { ListChat } from "../components/authComp/listChat";
import { Profile } from "../components/authComp/profile";

export const Home = () => {
  return (
    <div>
      {/* <Profile/> */}
      <ListChat />

      <AddChat />
    </div>
  );
};
