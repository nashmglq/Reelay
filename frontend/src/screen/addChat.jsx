export const AddChat = () => {
  const platforms = ["Tiktok", "Youtube", "Facebook"];
  const types = ["Script", "Image", "Script & Image"];

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="border-2 rounded-lg w-1/3 h-auto flex flex-col justify-center items-center shadow-lg p-4">
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
                    ? "w-full px-2 py-1 bg-black text-white rounded-l-lg hover:bg-neutral-800 transition-colors duration-300"
                    : type === "Image"
                    ? "w-full px-2 py-1 bg-white text-white bg-neutral-800 hover:bg-neutral-500 transition-colors duration-300"
                    : type === "Script & Image"
                    ? "w-full px-2 py-1 text-white bg-neutral-700 rounded-r-lg hover:bg-neutral-400 transition-colors duration-300"
                    : ""
                }
              >
                {type}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
