import { useEffect, useState } from "react";
import { X, Plus, Loader, DiscAlbum } from "lucide-react";
import { listViewOfChatStore, newChatStore } from "../../stores/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddChat = () => {
  const { newChat, loading, success, error, message } = newChatStore();
  const { listView } = listViewOfChatStore();
  const [show, setShow] = useState(false);
  const platforms = ["Tiktok", "Youtube", "Facebook"];
  const types = ["Script", "Image", "Script & Image"];
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [title, setTitle] = useState("");

  const toggleItem = (item, selectedArray, setSelectedArray) => {
    // 3 parameters = value(plat), array(selectedPlat), useState(setSelected)
    // if in the array the item exist, we then filter it out
    if (selectedArray.includes(item))
      // filter creates a new array that pass the condition...
      setSelectedArray(selectedArray.filter((i) => i != item));
    // get the array, then add the item, we use spread here to get the raw then add a new one
    else setSelectedArray([...selectedArray, item]);
  };

  const showHandler = (e) => {
    e.preventDefault();
    setShow(show ? false : true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = { title, selectedPlatforms, selectedTypes };
    newChat(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    return () => {
      toast.dismiss();
    };
  }, [message]);

  useEffect(() => {
    if (!loading && success) {
      listView();
      setShow(false);
    }
  }, [loading, message]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        onClick={showHandler}
        className="right-2 bottom-2 
        sm:right-10 sm:bottom-10
        p-1
        sm:p-4
        fixed
        border-2 rounded-full
        hover:scale-110 duration-300
        font-bold"
      >
        <Plus size={40} />
      </button>

      {show ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className=" rounded-lg w-[95%] sm:w-1/3 flex flex-col justify-center items-center shadow-lg p-4 bg-white border-nuetral-400">
            <button
              className="block flex w-full justify-end"
              onClick={showHandler}
            >
              <X />
            </button>

            <h1 className="text-xl font-semibold my-2">Create a new chat.</h1>
            <form
              className="flex flex-col w-full my-2"
              onSubmit={submitHandler}
            >
              <label>Title</label>
              <input
                className="border-2 border-neutral-800 rounded-lg p-2 my-2 "
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Platform</label>
              <div className="flex">
                {platforms.map((platform, index) => (
                  <button
                    key={index}
                    className={`w-full px-2 py-1 text-white  transition-colors duration-300 my-2
                      ${
                        platform === "Tiktok"
                          ? "bg-[#010101] rounded-l-lg hover:bg-neutral-800"
                          : platform === "Youtube"
                          ? "bg-[#FF0000] hover:bg-red-800"
                          : platform === "Facebook"
                          ? "bg-[#1877F2] rounded-r-lg hover:bg-blue-800"
                          : ""
                      }
                      ${
                        selectedPlatforms.includes(platform)
                          ? "border-2 border-neutral-200"
                          : ""
                      }
                      
                      `}
                    onClick={(e) => {
                      // add a function, because if we dont the toggleItem will be called as soon as this loads.
                      e.preventDefault();
                      toggleItem(
                        platform,
                        selectedPlatforms,
                        setSelectedPlatforms
                      );
                    }}
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
                    className={`
                      w-full px-2 py-1 text-white transition-colors duration-300 my-2
                      
                      ${
                        type === "Script"
                          ? "bg-black hover:bg-neutral-600 rounded-l-lg"
                          : type === "Image"
                          ? "bg-gray-900 hover:bg-neutral-600"
                          : type === "Script & Image"
                          ? "bg-gray-800 rounded-r-lg hover:bg-neutral-600"
                          : ""
                      }
     ${selectedTypes.includes(type) ? "border-2 border-gray-200" : ""}

                      `}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleItem(type, selectedTypes, setSelectedTypes);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <button
                className={`flex justify-center items-center w-full bg-black my-2 text-white rounded-lg p-2 hover:bg-gray-900 duration-300
              ${loading ? "bg-gray-900" : ""}`}
                disabled={loading}
              >
                {loading ? <Loader className="animate-spin" /> : "Create"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
