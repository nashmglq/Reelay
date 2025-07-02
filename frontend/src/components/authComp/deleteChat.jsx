import { useState } from "react";
import { deleteChatStore } from "../../stores/authStore";

export const DeleteChat = ({uuid}) => {
  const [show, setShow] = useState(false);
  const {deleteChat, loading, success, error, message} = deleteChatStore();


  const showHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleDelete = () => {
    deleteChat(uuid)
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  console.log(uuid)
  return (
    <div>
      <button
        className="hover:bg-neutral-100 duration-300 py-1 px-2 m-1"
        onClick={showHandler}
      >
        Delete
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold mb-4">Delete this chat?</h1>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
