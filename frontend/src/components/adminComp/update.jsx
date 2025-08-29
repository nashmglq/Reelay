import { UserPen } from "lucide-react";
import { useState } from "react";
import { updateUserStore } from "../../stores/admin";

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
    setOpen(false)
  };

  return (
    <div>
      <button
        className="hover:bg-gray-200 p-2 rounded-lg transition-all duration-300"
        onClick={modalButton}
      >
        <UserPen />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-1/4 flex flex-col justify-center items-center p-4 rounded-lg">
            <div className=" flex gap-x-2">
              <span>
                Update <span className="font-bold">{email}'s </span> ticket
              </span>
            </div>

            <form className="p-2" onSubmit={submitHandler}>
              <label>Ticket: </label>
              <input
                placeholder="Add tickets"
                value={tickets}
                className="border-2 rounded-lg p-2"
                onChange={(e) => setTickets(e.target.value)}
              />

              <div className="flex gap-x-4 m-2 justify-center items-center">
                <button className="transistion-all hover:bg-gray-800 hover:text-white duration-300 rounded-lg p-2">
                  {" "}
                  Update{" "}
                </button>
                <button
                  className="transistion-all hover:bg-red-400 hover:text-white duration-300 duration-300 rounded-lg p-2"
                  onClick={modalButton}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
