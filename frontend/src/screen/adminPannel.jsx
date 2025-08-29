import { Search, ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsersStore, searchUserStore } from "../stores/admin";
import { UpdateUser } from "../components/adminComp/update";
import { DeleteUser } from "../components/adminComp/deleteUser";

export const AdminPannel = () => {
  const [query, setQuery] = useState("");
  const [isSearch, setSearch] = useState(false);
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
      setSearch(false);
    } else {
      searchUser(query);
      setSearch(true);
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
        {isSearch
          ? searchMessage &&
            Array.isArray(searchMessage) &&
            searchMessage.length > 0
            ? searchMessage.map((findUser) => (
                <div
                  key={findUser.id}
                  className="border-2 rounded-lg p-2 w-full m-2 flex justify-between items-center"
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
                      <div className="flex items-center gap-x-2">
                        <p>{findUser.name} </p>
                        <span className="text-sm text-gray-300">
                          {findUser.admin ? <ShieldUser size={18} /> : null}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{findUser.email}</p>
                      <p className="text-sm text-gray-500">
                        Ticket: {findUser.ticket}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <UpdateUser id = {findUser.id} ticket = {findUser.ticket} email = {findUser.email}/>
                    <DeleteUser id={findUser.id} email = {findUser.email}/>
                  </div>
                </div>
              ))
            : "No user Found."
          : message && Array.isArray(message) && message.length > 0
          ? message.map((user) => (
              <div
                key={user.id}
                className="border-2 rounded-lg p-2 w-full m-2 flex justify-between items-center"
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
                    <div className="flex items-center gap-x-2">
                      <p>{user.name} </p>
                      <span className="text-sm">
                        {user.admin ? <ShieldUser size={18} /> : null}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Ticket: {user.ticket}
                    </p>
                  </div>
                </div>
                <div className="flex">
                <UpdateUser id = {user.id} ticket = {user.ticket} email = {user.email}/>
                  <DeleteUser id={user.id} email = {user.email}/>
                </div>
              </div>
            ))
          : "No users found"}
      </div>
    </div>
  );
};
