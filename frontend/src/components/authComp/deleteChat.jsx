import { useState } from "react";

export const DeleteChat = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button className="hover:bg-neutral-100 duration-300 py-1 px-2 m-1">
        Delete
      </button>

      {show ? (
        <div className="fixed inset-0 bg-dark bg-opacity-50 flex justify-center items-center">
          <div>
            <h1>Delete this chat?</h1>

          </div>
        </div>
      ) : null}
    </div>
  );
};
