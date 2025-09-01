import { UserPen } from "lucide-react";
import { useState } from "react";
import { updateUserStore } from "../../stores/admin";
import {motion} from "framer-motion";

export const UpdateUser = ({ id, ticket, email }) => {
  const [isOpen, setOpen] = useState(false);
  const [tickets, setTickets] = useState(ticket || "");
  const { updateUser, loading, success, error, message } = updateUserStore();

  const modalButton = (e) => {
    e.preventDefault();
    setOpen(isOpen ? false : true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = { tickets, id };
    updateUser(formData);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="hover:bg-gray-300 hover:text-black p-2 sm:p-3 rounded-lg transition-all duration-300 text-gray-600 hover:scale-105"
        onClick={modalButton}
      >
        <UserPen size={16} className="sm:w-5 sm:h-5" />
      </button>

      {isOpen ? (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
         initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
          <div className="bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-2xl mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-black to-black p-4 sm:p-6 text-white">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <UserPen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
                Update User
              </h3>
              <p className="text-sm sm:text-base text-black text-center mt-1 break-words text-white">
                Modify <span className="font-semibold text-white">{email}'s</span> ticket count
              </p>
            </div>

            <form className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6" onSubmit={submitHandler}>
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Ticket Count
                </label>
                <input
                  placeholder="Enter ticket count"
                  value={tickets}
                  type="number"
                  className="w-full border-2 border-gray-300 rounded-lg p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  onChange={(e) => setTickets(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                  type="submit"
                  className="flex-1 p-3 sm:p-4 bg-black hover:bg-black text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  className="flex-1 p-3 sm:p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={modalButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};
