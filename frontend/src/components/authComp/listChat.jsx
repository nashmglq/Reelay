import { Search } from "lucide-react";
import { listViewOfChatStore } from "../../stores/authStore";
import { useEffect } from "react";
import { formatDistanceToNowStrict, format } from "date-fns";

export const ListChat = () => {
  const { listView, loading, success, error, message } = listViewOfChatStore();
  useEffect(() => {
    listView();
  }, [listView]);

  const dateFormat = (data) => {
    if (!data) return "";
    const createdDate = new Date(data);
    const now = new Date();
    // make it as ms
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    // convert into days
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDay > 7) return format(createdDate, "MMM dd, yyyy");
    else return formatDistanceToNowStrict(createdDate, { addSuffix: true });
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-20 ">
        <form className="flex gap-x-2">
          <input
            className="border-2 rounded-lg w-[700px] p-2"
            placeholder="Search chat..."
          />
          <button className="text-white bg-black border-2 rounded-lg px-4">
            <Search />
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center mt-2 ">
        {message
          ? message.map((chat, index) => (
              <div className="border-2 rounded-lg  w-1/2 p-4 my-2 hover:scale-105 duration-300">
                <div className="flex justify-between">
                  <h1 className="font-semibold">{chat.title}</h1>
                  <h1 className="text-neutral-400">
                    {dateFormat(
                      chat.dateLastModified
                        ? chat.dateLastModified
                        : chat.createdDate
                    )}
                  </h1>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
