import { useState } from "react";
import { X, Loader } from "lucide-react";
import { updateChatStore } from "../../stores/authStore";
export const UpdateChat = () => {
  const [show, setShow] = useState(false);
  const platforms = ["Tiktok", "Youtube", "Facebook"];
  const types = ["Script", "Image"];
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [title, setTitle] = useState("");
  const { updateChat, loading, success, error, message } = updateChatStore();

  const showHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(!show);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const toggleItem = (item, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(item))
      setSelectedArray(selectedArray.filter((i) => i != item));
    else setSelectedArray([...selectedArray, item]);
  };

  return (
    <div>
      <button
        className="hover:bg-neutral-100 duration-300 py-1 px-2 m-1 z-10"
        onClick={showHandler}
      >
        Update
      </button>

      {show ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="rounded-lg w-[95%] sm:w-1/3 flex flex-col justify-center items-center shadow-lg p-4 bg-white border-nuetral-400">
            <button
            
              className="block flex w-full justify-end"
              onClick={showHandler}
            >
              <X />
            </button>

            <h1 className="text-xl font-semibold my-2">Update chat.</h1>
            <form
              className="flex flex-col w-full my-2"
              onSubmit={submitHandler}
              type="submit"
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
                                  ? "bg-gray-900 hover:bg-neutral-600 rounded-r-lg"
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
                {loading ? <Loader className="animate-spin" /> : "Update"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
