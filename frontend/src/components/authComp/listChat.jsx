import { Check, Pencil, PenLine, Search } from "lucide-react";
import {
  listViewOfChatStore,
  searchChats,
  updateChatStore,
} from "../../stores/authStore";
import { useEffect, useRef, useState } from "react";
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
  const [originalName, setOriginalName] = useState("");
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIdHover, setIsIdHover] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    listView();
  }, [listView]);

  useEffect(() => {
    if (updateSuccess) {
      setQuery("");
      setIsSearched(false);
    }
  }, [updateSuccess]);

  const dateFormat = (data) => {
    if (!data) return "";
    const createdDate = new Date(data);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDay > 7) return format(createdDate, "MMM dd, yyyy");
    else return formatDistanceToNowStrict(createdDate, { addSuffix: true });
  };

  const queryHandler = (e) => {
    e.preventDefault();
    const formData = { query };
    queryChat(formData);
  };

  useEffect(() => {
    if (searchMessage && searchSuccess) {
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  }, [searchMessage, searchSuccess, searchError]);

  const submitUpdate = (e) => {
    e.preventDefault();
    const formData = { title: updateName, uuid: idUpdate };
    if (checkUpdate) {
      updateChat(formData);
    }
    setIsUpdate(false);
    setIdUpdate(null);
    setUpdateName("");
    setOriginalName("");
    setCheckUpdate(false);
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="text-white bg-black border-2 rounded-lg px-4">
            <Search />
          </button>
        </form>

        {isSearched && (
          <div className="mt-4 text-sm text-neutral-600">
            Showing search results
          </div>
        )}

        <div className="flex items-center flex-col min-h-[500px] w-full">
          {searchSuccess && searchMessage
            ? searchMessage.map((query) => (
                <div className="border-2 rounded-lg w-full sm:w-[85%] my-2 hover:shadow-lg duration-300">
                  <div className="flex justify-between p-4">
                    <Link to={`/chat/${query.id}`} className="block w-full">
                      <div
                        className="flex gap-x-2"
                        onMouseEnter={() => {
                          setIsHovered(true);
                          setIsIdHover(query.id);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                          setIsIdHover(null);
                        }}
                      >
                        {isUpdate && query.id === idUpdate ? (
                          <input
                            value={updateName}
                            className="w-full border-2 border-neutral-900 rounded-lg"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              setUpdateName(value);
                              setCheckUpdate(value !== originalName);
                            }}
                          />
                        ) : (
                          <h1 className="w-full">{query.title}</h1>
                        )}

                        <button
                          className="hover:scale-105 duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            if (isUpdate && query.id === idUpdate) {
                              submitUpdate(e);
                            } else {
                              setIsUpdate(true);
                              setIdUpdate(query.id);
                              setUpdateName(query.title);
                              setOriginalName(query.title);
                              setCheckUpdate(false);
                            }
                          }}
                        >
                          {isUpdate && query.id === idUpdate ? (
                            <Check />
                          ) : isHovered && query.id === isIdHover ? (
                            <Pencil />
                          ) : null}
                        </button>
                      </div>
                      <div className="text-neutral-400">
                        {dateFormat(
                          query.dateLastModified ?? query.createdDate
                        )}
                      </div>
                    </Link>

                    <OverFlow uuid={query.id} />
                  </div>
                </div>
              ))
            : success && message
            ? message.map((chat, index) => (
                <div
                  className="border-2 rounded-lg w-full sm:w-[85%] my-2 hover:shadow-lg duration-300"
                  key={index}
                >
                  <div className="flex justify-between p-4">
                    <Link to={`/chat/${chat.id}`} className="block w-full">
                      <div
                        className="flex gap-x-2"
                        onMouseEnter={() => {
                          setIsHovered(true);
                          setIsIdHover(chat.id);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                          setIsIdHover(null);
                        }}
                      >
                        {isUpdate && chat.id === idUpdate ? (
                          <input
                            value={updateName}
                            className="w-full border-2 border-neutral-900 rounded-lg"
                            onChange={(e) => {
                              const value = e.target.value;
                              setUpdateName(value);
                              setCheckUpdate(value !== originalName);
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
                            if (isUpdate && chat.id === idUpdate) {
                              submitUpdate(e);
                            } else {
                              setIsUpdate(true);
                              setIdUpdate(chat.id);
                              setUpdateName(chat.title);
                              setOriginalName(chat.title);
                              setCheckUpdate(false);
                            }
                          }}
                        >
                          {isUpdate && chat.id === idUpdate ? (
                            <Check />
                          ) : isHovered && chat.id === isIdHover ? (
                            <Pencil />
                          ) : null}
                        </button>
                      </div>
                      <div className="text-neutral-400">
                        {dateFormat(chat.dateLastModified ?? chat.createdDate)}
                      </div>
                    </Link>

                    <OverFlow uuid={chat.id} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
