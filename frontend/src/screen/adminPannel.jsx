import { Search, ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsersStore, searchUserStore } from "../stores/admin";
import { UpdateUser } from "../components/adminComp/update";
import { DeleteUser } from "../components/adminComp/deleteUser";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex flex-col justify-center items-center w-full mt-4 sm:mt-6 lg:mt-10 px-4 sm:px-6 lg:px-8"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}

    >
      <form
        className="flex flex-col sm:flex-row justify-center items-center w-full max-w-4xl gap-2 sm:gap-x-2 my-6 sm:my-8 lg:my-10"
        onSubmit={search}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user..."
          className="border-2 rounded-lg p-2 sm:p-3 w-full sm:w-3/4 lg:w-1/2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="bg-black text-white rounded-lg p-2 sm:p-3 w-full sm:w-auto hover:bg-gray-800 transition-colors duration-200">
          <Search className="mx-auto sm:mx-0" size={20} />
        </button>
      </form>

      <div className="flex flex-col justify-center items-center w-full max-w-6xl px-2 sm:px-4">
        {isSearch
          ? searchMessage &&
            Array.isArray(searchMessage) &&
            searchMessage.length > 0
            ? searchMessage.map((findUser) => (
                <div
                  key={findUser.id}
                  className="border-2 rounded-lg p-3 sm:p-4 lg:p-6 w-full m-1 sm:m-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex w-full sm:w-auto items-center gap-x-3 sm:gap-x-4">
                    <img
                      src={
                        findUser && findUser.profilePic?.startsWith("http")
                          ? findUser.profilePic
                          : `${process.env.REACT_APP_SERVER_BASE_URL}/uploads/${findUser.profilePic}`
                      }
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-full flex-shrink-0 border-2 border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "default.jpg";
                      }}
                      alt="Profile Picture"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-x-2 flex-wrap">
                        <p className="font-medium text-sm sm:text-base lg:text-lg truncate">
                          {findUser.name}
                        </p>
                        <span className="text-sm text-gray-600 flex-shrink-0">
                          {findUser.admin ? (
                            <ShieldUser size={16} className="sm:w-5 sm:h-5" />
                          ) : null}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">
                        {findUser.email}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Ticket: {findUser.ticket}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start flex-shrink-0">
                    <UpdateUser
                      id={findUser.id}
                      ticket={findUser.ticket}
                      email={findUser.email}
                    />
                    <DeleteUser id={findUser.id} email={findUser.email} />
                  </div>
                </div>
              ))
            : (
              <div className="text-gray-500 text-center py-8 text-sm sm:text-base">
                No user found.
              </div>
            )
          : message && Array.isArray(message) && message.length > 0
          ? message.map((user) => (
              <div
                key={user.id}
                className="border-2 rounded-lg p-3 sm:p-4 lg:p-6 w-full m-1 sm:m-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex w-full sm:w-auto items-center gap-x-3 sm:gap-x-4">
                  <img
                    src={
                      user && user.profilePic?.startsWith("http")
                        ? user.profilePic
                        : `${process.env.REACT_APP_SERVER_BASE_URL}/uploads/${user.profilePic}`
                    }
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-full flex-shrink-0 border-2 border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default.jpg";
                    }}
                    alt="Profile Picture"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-x-2 flex-wrap">
                      <p className="font-medium text-sm sm:text-base lg:text-lg truncate">
                        {user.name}
                      </p>
                      <span className="text-sm flex-shrink-0">
                        {user.admin ? (
                          <ShieldUser size={16} className="sm:w-5 sm:h-5" />
                        ) : null}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Ticket: {user.ticket}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start flex-shrink-0">
                  <UpdateUser
                    id={user.id}
                    ticket={user.ticket}
                    email={user.email}
                  />
                  <DeleteUser id={user.id} email={user.email} />
                </div>
              </div>
            ))
          : (
            <div className="text-gray-500 text-center py-8 text-sm sm:text-base">
              No users found
            </div>
          )}
      </div>
    </motion.div>
  );
};
