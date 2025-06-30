import { Check, Pencil, PenLine, Search } from "lucide-react";
import {
  listViewOfChatStore,
  searchChats,
  updateChatStore,
} from "../../stores/authStore";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict, format } from "date-fns";
import { Link } from "react-router-dom";
import { OverFlow } from "./overflow";

export const ListChat = () => {
  const { listView, loading, success, error, message } = listViewOfChatStore();
  const {
    queryChat,
    loading: searchLoading,
    success: searchSuccess,
    error: searchError,
    message: searchMessage,
  } = searchChats();
  const {
    updateChat,
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = updateChatStore();
  const [query, setQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [checkUpdate, setCheckUpdate] = useState(false);

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

  const submitUpdate = (e) => {
    e.preventDefault();
    const formData = { updateName, idUpdate };
    console.log(formData);
    if (checkUpdate) updateChat(formData);
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

        {/* <div className="w-full px-20">
            {searchSuccess && query ? (<h1>Result based on your search...</h1>) : null}
      </div> */}

        <div className="flex items-center flex-col min-h-[500px] w-full">
          {searchSuccess && searchMessage
            ? searchMessage.map((query) => (
                <div className="border-2 rounded-lg w-full sm:w-[85%] my-2 hover:shadow-lg duration-300">
                  <div className="flex justify-between p-4">
                    <Link to={`/chat/${query.id}`} className="block w-full">
                      <div className="flex gap-x-2">
                        {isUpdate && query.id === idUpdate ? (
                          <input
                            value={updateName}
                            className="w-full border-2 border-neutral-900 rounded-lg"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            onChange={(e) => setUpdateName(e.target.value)}
                          />
                        ) : (
                          <h1 className="w-full">{query.title}</h1>
                        )}

                        <button
                          className="hover:scale-105 duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsUpdate(!isUpdate);
                            setIdUpdate(query.id);
                            submitUpdate(e);
                          }}
                        >
                          {isUpdate ? <Check /> : <Pencil />}
                        </button>
                      </div>
                      <div className="text-neutral-400">
                        {dateFormat(
                          query.dateLastModified ?? query.createdDate
                        )}
                      </div>
                    </Link>

                    <OverFlow />
                  </div>
                </div>
              ))
            : success && message
            ? message.map((chat, index) => (
                <div className="border-2 rounded-lg w-full sm:w-[85%] my-2 hover:shadow-lg duration-300">
                  <div className="flex justify-between p-4">
                    <Link to={`/chat/${chat.id}`} className="block w-full">
                      <div className="flex gap-x-2">
                        {isUpdate && chat.id === idUpdate ? (
                          <input
                            value={updateName}
                            className="w-full border-2 border-neutral-900 rounded-lg"
                            onChange={(e) => {
                              setUpdateName(e.target.value);
                              setCheckUpdate(true);
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          />
                        ) : (
                          <h1 className="w-full">{chat.title}</h1>
                        )}

                        <button
                          className="hover:scale-105 duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsUpdate(!isUpdate);
                            setIdUpdate(chat.id);
                            setUpdateName(chat.title);
                            const formData = { title: updateName, uuid: idUpdate };
                            if (checkUpdate) updateChat(formData);
                          }}
                        >
                          {isUpdate && chat.id === idUpdate ? (
                            <Check />
                          ) : (
                            <Pencil />
                          )}
                        </button>
                      </div>
                      <div className="text-neutral-400">
                        {dateFormat(chat.dateLastModified ?? chat.createdDate)}
                      </div>
                    </Link>

                    <OverFlow />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
