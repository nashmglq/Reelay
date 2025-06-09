import { useState } from "react";
import { X, Plus } from "lucide-react";
export const AddChat = () => {
  const [show, setShow] = useState(false);
  const platforms = ["Tiktok", "Youtube", "Facebook"];
  const types = ["Script", "Image", "Script & Image"];


  const showHandler = (e) => {
    e.preventDefault();
    setShow(show ? false : true);
  };

  return (
    <div>
      <button
        onClick={showHandler}
        className="right-10 
        bottom-10 fixed
        border-2 rounded-full
        hover:scale-110 duration-300
        p-8
        font-bold"
      >
        <Plus size={40} />
      </button>
      {show ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="border-4 rounded-lg w-1/3 h-auto flex flex-col justify-center items-center shadow-lg p-4 bg-white border-nuetral-400">
            <button
              className="block flex w-full justify-end"
              onClick={showHandler}
            >
              <X />
            </button>

            <h1 className="text-xl font-semibold">Create a new chat.</h1>
            <form className="flex flex-col w-full">
              <label>Title</label>
              <input className="border-2 border-neutral-800 rounded-lg p-2 " />

              <label>Platform</label>
              <div className="flex">
                {platforms.map((platform, index) => (
                  <button
                    key={index}
                    className={
                      platform === "Tiktok"
                        ? "w-full px-2 py-1 bg-[#010101] text-white rounded-l-lg hover:bg-neutral-800 transition-colors duration-300"
                        : platform === "Youtube"
                        ? "w-full px-2 py-1 bg-[#FF0000] text-white hover:bg-red-800 transition-colors duration-300"
                        : platform === "Facebook"
                        ? "w-full px-2 py-1 bg-[#1877F2] text-white rounded-r-lg hover:bg-blue-800 transition-colors duration-300"
                        : ""
                    }
                    onClick={(e) => e.preventDefault()}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              <label>Type</label>
              <div className="flex">
                {types.map((type, index) => (
                  <button
                    key={index}
                    className={
                      type === "Script"
                        ? "w-full px-2 py-1 bg-black text-white rounded-l-lg hover:bg-neutral-600 transition-colors duration-300 active:bg-neutral-500"
                        : type === "Image"
                        ? "w-full px-2 py-1 bg-gray-900 text-white bg-neutral-800 hover:bg-neutral-600 transition-colors duration-300 active:bg-neutral-500"
                        : type === "Script & Image"
                        ? "w-full px-2 py-1 text-white bg-gray-800 rounded-r-lg hover:bg-neutral-600 transition-colors duration-300 active:bg-neutral-500"
                        : ""
                    }
                    onClick={(e) => e.preventDefault()}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
