import { useEffect, useState } from "react";
import { getProfileStore } from "../../stores/authStore";
import { createPortal } from "react-dom";
import { User, X } from "lucide-react";
export const Profile = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { getProfile, loading, success, error, message } = getProfileStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const showHandler = (e) => {
    e.preventDefault();
    setShow(show ? false : true);
  };

  useEffect(() => {
    const handelChange = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handelChange(); // call in the first useEffect...

    // this will handel the rest...
    window.addEventListener("resize", handelChange);
  // This return is a cleanup function.
  // It removes the old event listener when the component is removed or updated,
  // to avoid stacking multiple listeners and prevent memory leaks.

    return () => {
      window.removeEventListener("resize", handelChange)
      // return becuase when refersh it will remove..
    };
    // no need to add window.innerWidth because is not a reactive value
  }, []);

  // console.log(message)
  return (
    <div>
      <button onClick={showHandler} className="sm:hidden">
        <User />
      </button>

      {show && isMobile ? (
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl border-2 w-3/4 sm:w-1/2 p-4">
              <button onClick={showHandler}>
                {" "}
                <X />
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={message?.profilePic || "default.jpg"}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <p>{message?.name || "Name error"}</p>
                <p>{message?.email || "Email error"}</p>
              </div>
            </div>
          </div>,
          document.body
        )
      ) : isMobile === false ? (
        <div className="flex mt-10 ml-10 rounded-lg shadow-xl border-2 w-full h-auto">
          <div className="my-2 w-full flex flex-col items-center">
            <img
              src={`${
                message && message.profilePic
                  ? message.profilePic
                  : "default.jpg"
              }`}
              className="rounded-full w-1/4 h-auto"
            />

            <p>{message && message.name ? message.name : "Name error"}</p>
            <p>{message && message.email ? message.email : "Email error"}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
