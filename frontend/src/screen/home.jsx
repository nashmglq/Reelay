import { AddChat } from "../components/addChat";
import { ListChat } from "../components/authComp/listChat";

export const Home = () => {
  return (
    <div>

        
      <div>
        <ListChat />
      </div>

      <AddChat />
    </div>
  );
};
