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
        className="hover:bg-red-400 hover:text-white p-2 rounded-lg transition-all duration-300"
      >
        {" "}
        <Trash />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="flex flex-col bg-white w-1/4 h-1/8 p-4 rounded-lg items-center justify-center">
            <div className=" flex gap-x-2">
              <span className="text-lg">
                Delete <span className="text-lg text-red-600">{email} </span> ?
              </span>
            </div>

            <div className="flex gap-x-2">
              <button
                className="p-2 hover:bg-gray-400 duration-300 transition-all rounded-lg"
                onClick={deleteButton}
              >
                Yes
              </button>
              <button
                className="p-2 hover:bg-red-400 duration-300 transition-all rounded-lg"
                onClick={modalButton}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
