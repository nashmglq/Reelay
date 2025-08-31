import { Trash } from "lucide-react";
import { useState } from "react";
import { deleteUserStore } from "../../stores/admin";

export const DeleteUser = ({ id, email }) => {
  const [isOpen, setOpen] = useState(false);
  const { deleteUser, loading, success, error, message } = deleteUserStore();

  const modalButton = (e) => {
    e.preventDefault();
    setOpen(isOpen ? false : true);
  };

  const deleteButton = (e) => {
    e.preventDefault();
    deleteUser(id);
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={modalButton}
        className="hover:bg-red-400 hover:text-white p-2 sm:p-3 rounded-lg transition-all duration-300 text-gray-600 hover:scale-105"
      >
        <Trash size={16} className="sm:w-5 sm:h-5" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          {/* Responsive Modal */}
          <div className="flex flex-col bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl items-center justify-center space-y-4 sm:space-y-6 mx-4">
            {/* Modal Content */}
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                Delete User
              </h3>
              <p className="text-sm sm:text-base text-gray-600 break-words">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-red-600">{email}</span>?
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <button
                className="flex-1 p-3 sm:p-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={deleteButton}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="flex-1 p-3 sm:p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={modalButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};