import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsersStore, searchUserStore } from "../stores/admin";

export const AdminPannel = () => {
  const [query, setQuery] = useState("");
  const { getUser, loading, success, error, message } = getUsersStore();
  const {
    searchUser,
    loading: searchLoading,
    success: searchSuccess,
    error: searchError,
    message: searchMessage,
  } = searchUserStore();

  const search = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      getUser();
    } else {
      searchUser(query);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <form
        className="flex justify-center items-center w-full gap-x-2 my-10"
        onSubmit={search}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user..."
          className="border-2 rounded-lg p-2 w-1/2"
        />
        <button className="bg-black text-white rounded-lg p-2">
          <Search />
        </button>
      </form>

      <div className="flex flex-col justify-center items-center w-1/2">
        {searchMessage && searchMessage.length > 0
          ? searchMessage.map((findUser) => (
              <div
                key={findUser.id}
                className="border-2 rounded-lg p-2 w-full m-2 flex gap-x-2 items-center"
              >
                <div className="flex h-full items-center gap-x-2">
                  <img
                    src={
                      findUser && findUser.profilePic?.startsWith("http")
                        ? findUser.profilePic
                        : `${process.env.REACT_APP_SERVER_BASE_URL}/uploads/${findUser.profilePic}`
                    }
                    className="w-10 h-10 object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default.jpg";
                    }}
                    alt="Profile Picture"
                  />
                  <div className="flex flex-col">
                    <p>{findUser.name}</p>
                    <p className="text-sm text-gray-400">{findUser.email}</p>
                  </div>
                </div>
                <p>{findUser.ticket}</p>
              </div>
            ))
          : message && message.length > 0
          ? message.map((user) => (
              <div
                key={user.id}
                className="border-2 rounded-lg p-2 w-full m-2 flex gap-x-2 items-center"
              >
                <div className="flex h-full items-center gap-x-2">
                  <img
                    src={
                      user && user.profilePic?.startsWith("http")
                        ? user.profilePic
                        : `${process.env.REACT_APP_SERVER_BASE_URL}/uploads/${user.profilePic}`
                    }
                    className="w-10 h-10 object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default.jpg";
                    }}
                    alt="Profile Picture"
                  />
                  <div className="flex flex-col">
                    <p>{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <p>{user.ticket}</p>
              </div>
            ))
          : "No users found"}
      </div>
    </div>
  );
};
