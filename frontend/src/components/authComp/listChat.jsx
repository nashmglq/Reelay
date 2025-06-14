import { Search } from "lucide-react";
import { listViewOfChatStore, searchChats } from "../../stores/authStore";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict, format } from "date-fns";

export const ListChat = () => {
  const { listView, loading, success, error, message } = listViewOfChatStore();
  const {
    queryChat,
    loading: searchLoading,
    success: searchSuccess,
    error: searchError,
    message: searchMessage,
  } = searchChats();
  const [query, setQuery] = useState("");
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

  const queryHandler = (e) => {
    e.preventDefault();
    const formData = { query };
    queryChat(formData);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center w-full mt-20 ">
        
        <form
          className="flex justify-center gap-x-2 w-full"
          onSubmit={queryHandler}
        >
          <input
            className="border-2 rounded-lg w-[80%] p-2"
            placeholder="Search chat..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="text-white bg-black border-2 rounded-lg px-4">
            <Search />
          </button>
        </form>

        <div className="flex items-center flex-col min-h-[500px] w-full">   
            
          {searchSuccess && searchMessage
            ? searchMessage.map((query) => (
                <div className="border-2 rounded-lg  w-[100%] sm:w-[85%] p-4 my-2 hover:scale-105 duration-300">
                  <div className="flex justify-between">
                    <h1 className="font-semibold">{query.title}</h1>
                    <h1 className="text-neutral-400">
                      {dateFormat(
                        query.dateLastModified
                          ? query.dateLastModified
                          : query.createdDate
                      )}
                    </h1>
                  </div>
                </div>
              ))
            : success && message
            ? message.map((chat, index) => (
                <div className="border-2 rounded-lg  w-[100%] sm:w-[85%] p-4 my-2 hover:scale-105 duration-300">
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
    </div>
  );
};
