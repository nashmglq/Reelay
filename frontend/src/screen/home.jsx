import { AddChat } from "../components/authComp/addChat";
import { ListChat } from "../components/authComp/listChat";

export const Home = () => {
  return (
    <div>
      <ListChat />

      <AddChat />
    </div>
  );
};
