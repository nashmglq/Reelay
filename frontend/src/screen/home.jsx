import { AddChat } from "../components/authComp/addChat";
import { ListChat } from "../components/authComp/listChat";
import { Profile } from "../components/authComp/profile";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
>
      <div className="flex p-4 gap-x-10 mt-10">
        <div className="hidden sm:block w-[20%] ">
          <Profile />
        </div>
        <div className="w-[100%] sm:w-[60%]">
          <ListChat />
        </div>
      </div>
      <AddChat />
    </motion.div>
  );
};
