export const DetailChat = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-2">
      <div className="flex flex-col justify-center items-center w-full h-full mt-5">
        <form className="flex flex-col justify-center items-center">
          <textarea className="border-2 rounded-lg resize-none w-[700px] h-[300px]" />
          <button className="mt-2 border-2 p-4 w-1/3 rounded-lg bg-black hover:scale-105 duration-300 text-white font-bold">
            Generate Script
          </button>
        </form>
      </div>

      <div className="flex justify-center items-center w-full h-full mt-5">
        <form>
          <textarea className="border-2 rounded-lg resize-none w-[700px] h-[300px]" />
        </form>
      </div>
    </div>
  );
};
